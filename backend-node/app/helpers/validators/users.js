import { TABLES, ERROR_MESSAGES } from '../../constants';
import { isEmpty, isString } from 'lodash';
import { isValidEmail } from './index';

const columns = TABLES.USERS.COLUMNS;

export function isValidUser(user) {
    const result = {};

    if(!user[columns.EMAIL]) {
        result[columns.EMAIL] = ERROR_MESSAGES.VALIDATION.VALUE_NOT_PASSED;
    } else if(!isValidEmail(user[columns.EMAIL])) {
        result[columns.EMAIL] = ERROR_MESSAGES.VALIDATION.INVALID_VALUE;
    }

    if(!user[columns.PASSWORD]) {
        result[columns.PASSWORD] = ERROR_MESSAGES.VALIDATION.VALUE_NOT_PASSED;
    } else if(!isString(user[columns.PASSWORD])) {
        result[columns.PASSWORD] = ERROR_MESSAGES.VALIDATION.SHOULD_BE_STRING;
    }

    if(!user[columns.FIRST_NAME]) {
        result[columns.FIRST_NAME] = ERROR_MESSAGES.VALIDATION.VALUE_NOT_PASSED;
    } else if(!isString(user[columns.FIRST_NAME])) {
        result[columns.FIRST_NAME] = ERROR_MESSAGES.VALIDATION.SHOULD_BE_STRING;
    }

    if(!user[columns.LAST_NAME]) {
        result[columns.LAST_NAME] = ERROR_MESSAGES.VALIDATION.VALUE_NOT_PASSED;
    } else if(!isString(user[columns.LAST_NAME])) {
        result[columns.LAST_NAME] = ERROR_MESSAGES.VALIDATION.SHOULD_BE_STRING;
    }

    return isEmpty(result) ? null : result;
}

export function isValidToken(code) {
    if(!isString(code)) {
        return ERROR_MESSAGES.VALIDATION.SHOULD_BE_STRING;
    } else if (isEmpty(code)){
        return ERROR_MESSAGES.VALIDATION.VALUE_NOT_PASSED;
    }
    return null;
}
