import { success, reject } from '../index';
import {
    isValidUser,
    isValidUUID,
    isValidEmail,
} from '../../helpers/validators';
import { formatUserForInsertion } from '../../helpers/formatters';
import { encryptPassword } from '../../services/crypt';
import {
    addUser,
    getUserByEmail,
    updateUser,
    sendActivationMail,
    repeatSendActivationMail,
    sendResetPasswordMail as sendResetPasswordMailService,
    setActivationMailStatusToUsed,
    setActivationMailStatusToExpired,
    getActivationMail,
    updateExistingActivationMails,
} from '../../services';
import { TABLES, ERROR_MESSAGES } from '../../constants';
import logger from '../../helpers/logger';
import { isExpriredActivationDate } from '../../helpers';

export async function createProfile(req, res) {
    try {
        const profileData = formatUserForInsertion(req.body.profileData);

        const profileDataValidationInfo = isValidUser(profileData);
        if (profileDataValidationInfo) {
            return reject(res, ERROR_MESSAGES.PROFILE.INVALID_PROFILE_DATA, profileDataValidationInfo);
        }

        const userEmail = profileData[TABLES.USERS.COLUMNS.EMAIL];
        const userWithEmail = await getUserByEmail(userEmail);
        if (userWithEmail) {
            return reject(res, ERROR_MESSAGES.PROFILE.EMAIL_ALREADY_USED, {
                [TABLES.USERS.COLUMNS.EMAIL]: profileData[TABLES.USERS.COLUMNS.EMAIL],
            });
        }

        const { encryptedPassword, salt } = await encryptPassword(profileData[TABLES.USERS.COLUMNS.PASSWORD]);
        profileData[TABLES.USERS.COLUMNS.PASSWORD] = encryptedPassword;
        profileData[TABLES.USERS.COLUMNS.KEY] = salt;

        const user = await addUser(profileData);

        const info = await sendActivationMail(user[TABLES.USERS.COLUMNS.EMAIL]);

        return success(res, { info });
    } catch(error) {
        logger.error(error);
        return reject(res, ERROR_MESSAGES.PROFILE.CREATE_PROFILE_ERROR);
    }
}

export async function activateUser(req, res) {
    try {
        const { hash } = req.body;
        const user = res.locals.user;

        if (user[TABLES.USERS.COLUMNS.IS_ACTIVE]) {
            return reject(res, ERROR_MESSAGES.PROFILE.USER_ALREADY_ACTIVATED);
        }

        if (!isValidUUID(hash)) {
            return reject(res, ERROR_MESSAGES.PROFILE.INVALID_HASH);
        }

        const mail = await getActivationMail(hash);

        if (!mail) {
            return reject(res, ERROR_MESSAGES.PROFILE.ACTIVATION_LINK_EXPIRED);
        }

        if (
            isExpriredActivationDate(
                new Date(mail[TABLES.ACTIVATION_MAILS.COLUMNS.CREATION_DATE]).getTime(),
                Date.now())
        ) {
            await setActivationMailStatusToExpired(mail.id);
            return reject(res, ERROR_MESSAGES.PROFILE.ACTIVATION_LINK_EXPIRED);
        }

        if (user[TABLES.USERS.COLUMNS.EMAIL] !== mail[TABLES.ACTIVATION_MAILS.COLUMNS.EMAIL]) {
            return reject(res, ERROR_MESSAGES.PROFILE.HASH_USER_MISMATCH, {
                [TABLES.ACTIVATION_MAILS.COLUMNS.EMAIL]: mail[TABLES.ACTIVATION_MAILS.COLUMNS.EMAIL],
            });
        }

        await updateUser(user.id, {
            [TABLES.USERS.COLUMNS.IS_ACTIVE]: true,
        });

        await setActivationMailStatusToUsed(mail.id);
        return success(res);
    } catch (error) {
        logger.error(error);
        return reject(res, ERROR_MESSAGES.PROFILE.ACTIVATION_ERROR);
    }
}

export async function resendActivationMail(req, res) {
    try {
        const user = res.locals.user;

        if (user[TABLES.USERS.COLUMNS.IS_ACTIVE]) {
            return reject(res, ERROR_MESSAGES.PROFILE.USER_ALREADY_ACTIVATED);
        }

        await repeatSendActivationMail(user[TABLES.USERS.COLUMNS.EMAIL]);

        return success(res);
    } catch(error) {
        logger.error(error);
        return reject(res, ERROR_MESSAGES.PROFILE.RESEND_FAILED);
    }
}

export async function sendResetPasswordMail(req, res) {
    try {
        const { email } = req.body;

        if(!isValidEmail(email)) {
            return reject(res, ERROR_MESSAGES.VALIDATION.INVALID_EMAIL_FORMAT, { email });
        }

        const user = await getUserByEmail(email);
        if(!user) {
            return reject(res, ERROR_MESSAGES.PROFILE.USER_NOT_EXIST, { email });
        }
        if(!user[TABLES.USERS.COLUMNS.IS_ACTIVE]) {
            return reject(res, ERROR_MESSAGES.PROFILE.UNACTIVATED_PROFILE);
        }

        await sendResetPasswordMailService(email, user.id);

        return success(res);
    } catch(error) {
        logger.error(error);
        return reject(res, ERROR_MESSAGES.PROFILE.SEND_RESET_PASSWORD_MAIL_ERROR);
    }
}

export async function activationBackdoor(req, res) {
    try {
        if (process.env.NODE_ENV !== 'test') {
            return reject(res);
        }

        const { user } = res.locals;

        await updateUser(user.id, {
            [TABLES.USERS.COLUMNS.IS_ACTIVE]: true,
        });

        await updateExistingActivationMails(user[TABLES.USERS.COLUMNS.EMAIL]);

        return success(res, user);
    } catch(error) {
        logger.error(error);
        return reject(res);
    }
}
