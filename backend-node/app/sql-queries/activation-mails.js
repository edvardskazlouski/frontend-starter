import squel from 'squel';
import { TABLES, ACTIVATION_MAILS_STATUSES } from '../constants';

const squelPostgres = squel.useFlavour('postgres');

const table = TABLES.ACTIVATION_MAILS;
const columns = table.COLUMNS;

export function getSetAllPendingActivationMailsStatusesToUnusedQuery(email) {
    return squelPostgres.update()
        .table(table.NAME)
        .set(columns.STATUS, ACTIVATION_MAILS_STATUSES.UNUSED)
        .where(`${columns.EMAIL} = '${email}'`)
        .where(`${columns.STATUS} = '${ACTIVATION_MAILS_STATUSES.PENDING}'`)
        .toString();
}

export function getSetActivationMailExpiredByIdQuery(id) {
    return squelPostgres.update()
        .table(table.NAME)
        .set(columns.STATUS, ACTIVATION_MAILS_STATUSES.EXPIRED)
        .where(`id = '${id}'`)
        .returning('*')
        .toString();
}

export function getSetActivationMailUsedByIdQuery(id) {
    return squelPostgres.update()
        .table(table.NAME)
        .set(columns.STATUS, ACTIVATION_MAILS_STATUSES.USED)
        .where(`id = '${id}'`)
        .returning('*')
        .toString();
}

export function getSelectActivationMailByIdQuery(id) {
    return squel.select()
        .from(table.NAME)
        .where(`id = '${id}'`)
        .toString();
}

export function getInsertActivationMailQuery(mail) {
    return squelPostgres.insert()
        .into(table.NAME)
        .setFields(mail)
        .returning('*')
        .toString();
}
