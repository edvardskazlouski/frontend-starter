import squel from 'squel';
import { TABLES } from '../constants';

const table = TABLES.USERS;
const columns = table.COLUMNS;

const squelPostgres = squel.useFlavour('postgres');

export function getSelectUserByEmailQuery(email) {
    return squel.select()
        .from(table.NAME)
        .where(`${columns.EMAIL} = '${email}'`)
        .toString();
}

export function getInsertUserQuery(user) {
    return squelPostgres.insert()
        .into(table.NAME)
        .setFields(user)
        .returning('*')
        .toString();
}

export function getDeleteUserByIdQuery(id) {
    return squelPostgres.delete()
        .from(table.NAME)
        .where(`id = '${id}'`)
        .returning('*')
        .toString();
}

export function getSelectUserByIdQuery(id) {
    return squel.select()
        .from(table.NAME)
        .where(`id = '${id}'`)
        .toString();
}

export function getUpdateUserByIdQuery(id, values) {

    return squelPostgres.update()
        .table(table.NAME)
        .setFields(values)
        .where(`id = '${id}'`)
        .returning('*')
        .toString();
}
