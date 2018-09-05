import { success, reject } from '../';
import logger from '../../helpers/logger';
import { TABLES, ERROR_MESSAGES, RESET_PASSWORD_MAILS_STATUSES } from '../../constants';
import {
    getUser,
    encryptPassword,
    updateUser,
    getResetPasswordMailById,
    getUserByEmail,
    setResetPasswordMailStatusToExpired,
    setResetPasswordMailStatusToUsed,
} from '../../services';
import { isValidUUID } from '../../helpers/validators';
import { isString } from 'lodash';
import {
    isExpriredResetPasswordDate,
} from '../../helpers';

export async function resetPassword(req, res) {
    try {
        const { hash, newPassword } = req.body;

        if (!isValidUUID(hash)) {
            return reject(res, ERROR_MESSAGES.PROFILE.RESET_PASSWORD_LINK_EXPIRED);
        }

        if (!isString(newPassword)) {
            return reject(res, ERROR_MESSAGES.PROFILE.INVALID_RESET_PASSWORD_DATA, {
                newPassword: ERROR_MESSAGES.VALIDATION.SHOULD_BE_STRING,
            });
        }

        const mail = await getResetPasswordMailById(hash);
        if (!mail || mail[TABLES.RESET_PASSWORD_MAILS.COLUMNS.STATUS] !== RESET_PASSWORD_MAILS_STATUSES.PENDING) {
            return reject(res, ERROR_MESSAGES.PROFILE.RESET_PASSWORD_LINK_EXPIRED);
        }
        const user = await getUserByEmail(mail[TABLES.RESET_PASSWORD_MAILS.COLUMNS.EMAIL]);

        if (
            isExpriredResetPasswordDate(
                new Date(mail[TABLES.RESET_PASSWORD_MAILS.COLUMNS.CREATION_DATE]).getTime(),
                Date.now()
            )
        ) {
            await setResetPasswordMailStatusToExpired(mail.id);
            return reject(res, ERROR_MESSAGES.PROFILE.RESET_PASSWORD_LINK_EXPIRED);
        }

        const { encryptedPassword, salt } = await encryptPassword(newPassword);

        const result = await updateUser(
            user.id,
            {
                [TABLES.USERS.COLUMNS.PASSWORD]: encryptedPassword,
                [TABLES.USERS.COLUMNS.KEY]: salt,
            }
        );
        if (!result) {
            return reject(res, ERROR_MESSAGES.PROFILE.RESET_PASSWORD_ERROR);
        }

        await setResetPasswordMailStatusToUsed(mail.id);

        return success(res);
    } catch (error) {
        logger.error(error);
        return reject(res, ERROR_MESSAGES.PROFILE.RESET_PASSWORD_ERROR);
    }
}

export async function updatePassword(req, res) {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await getUser(res.locals.user.id);

        if (!isString(newPassword)) {
            return reject(res, ERROR_MESSAGES.PROFILE.INVALID_RESET_PASSWORD_DATA, {
                newPassword: ERROR_MESSAGES.VALIDATION.SHOULD_BE_STRING,
            });
        }

        if (!isString(oldPassword)) {
            return reject(res, ERROR_MESSAGES.PROFILE.INVALID_RESET_PASSWORD_DATA, {
                oldPassword: ERROR_MESSAGES.VALIDATION.SHOULD_BE_STRING,
            });
        }

        const oldPasswordEncryptionData = await encryptPassword(oldPassword, user[TABLES.USERS.COLUMNS.KEY]);
        if(oldPasswordEncryptionData.encryptedPassword !== user[TABLES.USERS.COLUMNS.PASSWORD]) {
            return reject(res, ERROR_MESSAGES.PROFILE.WRONG_PASSWORD);
        }

        const { encryptedPassword, salt } = await encryptPassword(newPassword);

        const result = await updateUser(
            res.locals.user.id,
            {
                [TABLES.USERS.COLUMNS.PASSWORD]:  encryptedPassword,
                [TABLES.USERS.COLUMNS.KEY]: salt,
            },
        );
        if (!result) {
            return reject(res, ERROR_MESSAGES.PROFILE.UPDATE_PASSWORD_ERROR);
        }

        return success(res);
    } catch(error) {
        logger.error(error);
        return reject(res, ERROR_MESSAGES.PROFILE.UPDATE_PASSWORD_ERROR);
    }
}
