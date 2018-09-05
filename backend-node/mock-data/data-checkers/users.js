import { none } from '../../app/db';
import { keys } from 'lodash';
import { getSelectUsersByEmailsQuery } from '../../app/helpers/sql';
import { manyOrNone } from '../../app/db/index';

export function checkUsers(emails) {
    return manyOrNone(getSelectUsersByEmailsQuery(emails));
}

function checkDataInTable(table, dataMap) {
    return none(`select * from ${table} where id in ('${keys(dataMap).join('\', \'')}')`);
}
