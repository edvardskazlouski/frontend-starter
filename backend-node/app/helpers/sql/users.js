import squel from 'squel';
import { TABLES } from '../../constants';
const table = TABLES.USERS;
const columns = table.COLUMNS;
const squelPostgres = squel.useFlavour('postgres');

export function getDeleteUsersByEmailsQuery(emails) {
    return squelPostgres.delete()
        .from(table.NAME)
        .where(`${columns.EMAIL} IN ('${emails.join('\',\'')}')`)
        .toString();
}

export function getSelectUsersByEmailsQuery(emails) {
    return squel.select()
        .from(table.NAME)
        .where(`${columns.EMAIL} IN ('${emails.join('\',\'')}')`)
        .toString();
}

export function getDeleteUserByEmailQuery(email) {
    return squelPostgres.delete()
        .from(table.NAME)
        .where(`${columns.EMAIL} = '${email}'`)
        .returning('*')
        .toString();
}

export function getInsertUsersQuery(users) {
    return squelPostgres.insert()
        .into(table.NAME)
        .setFieldsRows(users)
        .returning('*')
        .toString();
}
