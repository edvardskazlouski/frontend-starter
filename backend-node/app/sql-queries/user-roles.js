import squel from 'squel';
import { TABLES } from '../constants';

const table = TABLES.USER_ROLES;
const columns = table.COLUMNS;

export function getSelectRoleIdQuery(role) {
    return squel.select()
        .from(table.NAME)
        .field('id')
        .where(`${columns.ROLE} = '${role}'`)
        .toString();
}

export function getSelectUserRoleByIdQuery(id) {
    return squel.select()
        .from(table.NAME)
        .where(`id = '${id}'`)
        .toString();
}

export function getSelectBusinessOwnerRoleIdQuery() {
    return squel.select()
        .from(table.NAME)
        .field('id')
        .where(`${columns.ROLE} = 'business-owner'`)
        .toString();
}
