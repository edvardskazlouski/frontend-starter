import { DEFAULT_USERS_AMOUNT, TEST_PREFIX } from '../constants';
import { TABLES } from '../../app/constants';

export function getUsers(amount = DEFAULT_USERS_AMOUNT, prefix = TEST_PREFIX, isActivate = false) {
    const cols = TABLES.USERS.COLUMNS;
    return new Array(amount).fill(1).map((item, index) => {
        return {
            [cols.EMAIL]: `${prefix.toLowerCase()}user${index}@gmail.com`,
            [cols.FIRST_NAME]: `firstname${index}`,
            [cols.LAST_NAME]: `lastname${index}`,
            [cols.PASSWORD]: `password${index}`,
            [cols.IS_ACTIVE]: isActivate,
        };
    });
}
