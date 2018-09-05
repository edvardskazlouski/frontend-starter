import router from './router';

import {
    getCompanyById,
    getUsersRoleInCompany,
} from '../services';
import { TABLES, ERROR_MESSAGES } from '../constants';
import { isValidUUID } from '../helpers/validators';
import logger from '../helpers/logger';

export function success(res, data) {
    const result = {
        success: true,
        ...data,
    };

    res.status(200).send(result);
}

export function reject(res, error, data) {
    const result = {
        success: false,
        error,
        data,
    };

    res.status(400).send(result);
}

function extractCompanyId(req) {
    return req.headers['company-id'] || req.params['companyId'];
}

export async function isUserRelatedToCompany(req, res, next) {
    const companyId = extractCompanyId(req);

    if (!companyId) {
        return reject(res, ERROR_MESSAGES.COMPANIES.COMPANY_ID_IS_NOT_PASSED);
    }

    try {
        if (!isValidUUID(companyId)) {
            return reject(res, ERROR_MESSAGES.VALIDATION.INVALID_ID_FORMAT, { companyId });
        }

        const company = await getCompanyById(companyId);
        if (!company) {
            return reject(res, ERROR_MESSAGES.COMPANIES.COMPANY_DOES_NOT_EXIST, { companyId });
        }

        const userRole = await getUsersRoleInCompany(companyId, res.locals.user.id);
        if (!userRole) {
            return reject(res, ERROR_MESSAGES.COMPANIES.USER_NOT_RELATED_TO_COMPANY, {
                userId: res.locals.user.id,
                companyId
            });
        }

        res.locals.userRole = userRole[TABLES.USER_ROLES.COLUMNS.ROLE];
        res.locals.company = company;
        next();

    } catch(error) {
        logger.error(error);
        return reject(res, ERROR_MESSAGES.COMPANIES.USER_RELATION_WITH_COMPANY_CHECK_FAILED);
    }
}

export function getIsRouteAllowedMiddleware(roles) {
    return async function (req, res, next) {
            if (roles.includes(res.locals.userRole)) {
                next();
            } else {
                return reject(res, ERROR_MESSAGES.AUTH.NOT_ENOUGH_RIGHTS);
            }
    };
}

export default router;
