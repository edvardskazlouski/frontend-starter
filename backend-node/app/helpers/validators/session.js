import { TABLES, ERROR_MESSAGES } from '../../constants';
import { isValidEmail } from './index';
import { isEmpty, isString } from 'lodash';

const columns = TABLES.USERS.COLUMNS;

export function isValidLogInData(logInData) {
    const result = {};

    if(!logInData[columns.EMAIL]) {
        result[columns.EMAIL] = ERROR_MESSAGES.VALIDATION.VALUE_NOT_PASSED;
    } else if(!isValidEmail(logInData[columns.EMAIL])) {
        result[columns.EMAIL] = ERROR_MESSAGES.VALIDATION.INVALID_EMAIL_FORMAT;
    }

    if(!logInData[columns.PASSWORD]) {
        result[columns.PASSWORD] = ERROR_MESSAGES.VALIDATION.VALUE_NOT_PASSED;
    } else if(!isString(logInData[columns.PASSWORD])) {
        result[columns.PASSWORD] = ERROR_MESSAGES.VALIDATION.INVALID_VALUE;
    }

    return isEmpty(result) ? null : result;
}
