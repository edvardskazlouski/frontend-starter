import { success, reject } from '../index';
import { ERROR_MESSAGES } from '../../constants';
import logger from '../../helpers/logger';
import { formatUserForResponse } from '../../helpers/formatters';

export async function getProfile(req, res) {
    try {
        const user = formatUserForResponse(res.locals.user);
        return success(res, { user });
    } catch(error) {
        logger.error(error);
        return reject(res, ERROR_MESSAGES.PROFILE.GET_PROFILE_ERROR);
    }
}
