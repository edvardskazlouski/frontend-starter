import squel from 'squel';
import { TABLES } from '../constants';

const squelPostgres = squel.useFlavour('postgres');

const table = TABLES.SIGN_UP_CODES;
const columns = table.COLUMNS;

export function getSelectSignUpCodeQuery(code) {
    return squel.select()
        .from(table.NAME)
        .where(`${columns.CODE}='${code}'`)
        .toString();
}

export function getDeleteSignUpCodeByIdQuery(id) {
    return squelPostgres.delete()
        .from(table.NAME)
        .where(`id='${id}'`)
        .returning('*')
        .toString();
}

export function getInsertSignUpCodeQuery(value) {
    return squelPostgres.insert()
        .into(table.NAME)
        .setFields(value)
        .returning('*')
        .toString();
}
