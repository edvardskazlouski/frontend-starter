import { TABLES } from '../../constants';
import { isString } from 'lodash';

const columns = TABLES.USERS.COLUMNS;

export function formatUserForInsertion(rawUser) {
    return {
        [columns.EMAIL]: isString(rawUser[columns.EMAIL]) && rawUser[columns.EMAIL].toLowerCase(),
        [columns.FIRST_NAME]: rawUser[columns.FIRST_NAME],
        [columns.LAST_NAME]: rawUser[columns.LAST_NAME],
        [columns.PASSWORD]: rawUser[columns.PASSWORD],
        [columns.KEY]: rawUser[columns.KEY],
    };
}

export function formatUserForResponse(userFromBase) {
    return {
        [columns.EMAIL]: userFromBase[columns.EMAIL],
        [columns.FIRST_NAME]: userFromBase[columns.FIRST_NAME],
        [columns.LAST_NAME]: userFromBase[columns.LAST_NAME],
        [columns.IS_ACTIVE]: userFromBase[columns.IS_ACTIVE],
    };
}

export function MakeReqForCreateProfile (rawUser) {
    return{
        [columns.FIRST_NAME]: rawUser[columns.FIRST_NAME],
        [columns.LAST_NAME]: rawUser[columns.LAST_NAME],
        [columns.EMAIL]: rawUser[columns.EMAIL],
        [columns.PASSWORD]: rawUser[columns.PASSWORD]
    };
}

export function MakeReqForActivateUser (data) {
    return {
        [columns.ID]: data.user[columns.ID],
        [columns.FIRST_NAME]: data.user[columns.FIRST_NAME],
        [columns.LAST_NAME]: data.user[columns.LAST_NAME],
        [columns.EMAIL]: data.user[columns.EMAIL],
        [columns.IS_ACTIVE]: data.user[columns.IS_ACTIVE],
        [columns.PASSWORD]: data.user[columns.PASSWORD],
        token: data.token
    };
}
