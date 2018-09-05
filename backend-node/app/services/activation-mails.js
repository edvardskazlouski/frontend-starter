import { oneOrNone } from '../db';
import {
    getInsertActivationMailQuery,
    getSelectActivationMailByIdQuery,
    getSetAllPendingActivationMailsStatusesToUnusedQuery,
    getSetActivationMailExpiredByIdQuery,
    getSetActivationMailUsedByIdQuery,
} from '../sql-queries';

export function updateExistingActivationMails(email) {
    return oneOrNone(getSetAllPendingActivationMailsStatusesToUnusedQuery(email));
}

export function setActivationMailStatusToExpired(id) {
    return oneOrNone(getSetActivationMailExpiredByIdQuery(id));
}

export function setActivationMailStatusToUsed(id) {
    return oneOrNone(getSetActivationMailUsedByIdQuery(id));
}

export function getActivationMail(id) {
    return oneOrNone(getSelectActivationMailByIdQuery(id));
}

export function insertActivationMail(mail) {
    return oneOrNone(getInsertActivationMailQuery(mail));
}
