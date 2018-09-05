import logger from '../../helpers/logger';
import { success, reject } from '../index';
import { ERROR_MESSAGES } from '../../constants';
import {
    deleteUser as deleteUserService
} from '../../services';
import { formatUserForResponse } from '../../helpers/formatters';

export async function deleteProfile(req, res) {
    try{
        const userId = res.locals.user.id;
        const userDeleted = await deleteUserService(userId);

        return success(res, { user: formatUserForResponse(userDeleted) });
    } catch (error) {
        logger.error(error);
        return reject(res, ERROR_MESSAGES.PROFILE.DELETE_PROFILE_ERROR);
    }
}
