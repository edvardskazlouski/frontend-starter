import {
    ERROR_MESSAGES,
    ALLOWED_FOR_UNACTIVATED,
    ALLOWED_FOR_UNAUTHORIZED,
    TABLES,
} from '../../constants';
import { decodeJWToken } from '../../services';
import { getUser } from '../../services';
import { reject } from '../index';
import { includes } from 'lodash';
import { isValidUUID } from '../../helpers/validators';

function isAllowedRoute(req, allowedRoutes) {
    return includes(allowedRoutes[req.method], req.baseUrl);
}

function extractToken(req) {
    return req.headers['x-access-token'];
}

export async function isAuthorized(req, res) {
    if(isAllowedRoute(req, ALLOWED_FOR_UNAUTHORIZED)) {
        return req.next();
    }

    const token = extractToken(req);

    if(token) {
        let data;
        let user;

        try {
            data = await decodeJWToken(token);
            if (!isValidUUID(data.id)) {
                return reject(res, ERROR_MESSAGES.VALIDATION.INVALID_ID_FORMAT);
            }

            user = await getUser(data.id);
        } catch (err) {
            return reject(res, ERROR_MESSAGES.AUTH.AUTHORIZATION_ERROR);
        }

        if(user) {
            res.locals.user = user;
            return req.next();
        }

        return reject(res, ERROR_MESSAGES.AUTH.AUTHORIZATION_ERROR);
    }
    return reject(res, ERROR_MESSAGES.AUTH.UNAUTHORIZED_USER);
}

export function isActivated(req, res) {
    if (!res.locals.user) {
        return req.next();
    }

    if (isAllowedRoute(req, ALLOWED_FOR_UNACTIVATED) || res.locals.user[TABLES.USERS.COLUMNS.IS_ACTIVE]) {
        return req.next();
    }

    return reject(res, ERROR_MESSAGES.PROFILE.UNACTIVATED_PROFILE);
}
