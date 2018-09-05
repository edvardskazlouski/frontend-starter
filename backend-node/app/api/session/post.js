import { TABLES, ERROR_MESSAGES } from '../../constants';
import { success, reject } from '../index';
import { getUserByEmail } from '../../services/users';
import { encryptPassword} from '../../services/crypt';
import { getTokenForUser } from '../../services/token';
import { isValidLogInData } from '../../helpers/validators/session';
import { formatLogInData } from '../../helpers/formatters';
import logger from '../../helpers/logger';

export async function logIn(req, res) {
    try {
        const columns = TABLES.USERS.COLUMNS;

        const logInData = formatLogInData(req.body.logInData);

        const logInDataValidationInfo = isValidLogInData(logInData);
        if(logInDataValidationInfo) {
            return reject(res, ERROR_MESSAGES.PROFILE.INVALID_LOG_IN_DATA, logInDataValidationInfo);
        }

        const user = await getUserByEmail(logInData[columns.EMAIL]);
        if (!user) {
            return reject(res, ERROR_MESSAGES.PROFILE.USER_NOT_EXIST, {
                [columns.EMAIL]: logInData[columns.EMAIL]
            });
        }

        const { encryptedPassword } = await encryptPassword(logInData[columns.PASSWORD], user[columns.KEY]);

        if (user[columns.PASSWORD] !== encryptedPassword) {
            return reject(res, ERROR_MESSAGES.PROFILE.WRONG_PASSWORD);
        }

        const token = await getTokenForUser(user);

        return success(res, { token });
    } catch (error) {
        logger.error(error);
        return reject(res, ERROR_MESSAGES.PROFILE.LOG_IN_ERROR);
    }
}
