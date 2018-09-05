import squel from 'squel';
import { TABLES, ACTIVATION_MAILS_STATUSES } from '../../constants';
const table = TABLES.ACTIVATION_MAILS;
const columns = table.COLUMNS;
const squelPostgres = squel.useFlavour('postgres');

export function getDeleteActivationMailByEmailQuery(email) {
    return squelPostgres.delete()
        .from(table.NAME)
        .where(`${columns.EMAIL} = '${email}'`)
        .returning('*')
        .toString();
}

export function getDeleteActivationMailByIdQuery(id) {
    return squelPostgres.delete()
        .from(table.NAME)
        .where(`id = '${id}'`)
        .returning('*')
        .toString();
}

export function getDeleteActivationMailsByEmailsQuery(emails) {
    return squelPostgres.delete()
        .from(table.NAME)
        .where(`${columns.EMAIL} IN ('${emails.join('\',\'')}')`)
        .returning('*')
        .toString();
}

export function getSetActivationTimeEmailQuery(email, data) {
    return squelPostgres.update()
        .table(table.NAME)
        .set(columns.CREATION_DATE, data)
        .where(`${columns.EMAIL} = '${email}'`)
        .returning('*')
        .toString();
}

export function getSelectActivationMailByEmailQuery(email) {
    return squelPostgres.select()
        .from(table.NAME)
        .where(`email = '${email}'`)
        .toString();
}

export function getSelectPendingActivationMailByEmailQuery(email) {
    return squelPostgres.select()
        .from(table.NAME)
        .where(`email = '${email}'`)
        .where(`status = '${'PENDING'}'`)
        .toString();
}

export function getSelectExpiredActivationMailByEmailQuery(email) {
    return squelPostgres.select()
        .from(table.NAME)
        .where(`email = '${email}'`)
        .where(`status = '${'EXPIRED'}'`)
        .toString();
}

export function getSetActivationMailPendingByIdQuery(id) {
    return squelPostgres.update()
        .table(table.NAME)
        .set(columns.STATUS, ACTIVATION_MAILS_STATUSES.PENDING)
        .where(`id = '${id}'`)
        .returning('*')
        .toString();
}
