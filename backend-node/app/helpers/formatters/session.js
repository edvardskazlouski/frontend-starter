import { TABLES } from '../../constants';
import { isString } from 'lodash';

const columns = TABLES.USERS.COLUMNS;

export function formatLogInData(rawLogInData) {
    return {
        [columns.EMAIL]: isString(rawLogInData[columns.EMAIL]) && rawLogInData[columns.EMAIL].toLowerCase(),
        [columns.PASSWORD]: rawLogInData[columns.PASSWORD],
    };
}
