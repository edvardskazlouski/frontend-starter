import { oneOrNone } from '../db';
import {
    getSelectResetPasswordMailByEmailQuery,
    getInsertResetPasswordMailQuery,
    getSelectResetPasswordMailByIdQuery,
    getSetResetPasswordMailExpiredByIdQuery,
    getSetResetPasswordMailUsedByIdQuery,
    getSetAllPendingResetPasswordMailsStatusesToUnusedQuery,
} from '../sql-queries';

export function updateExistingResetPasswordMails(email) {
    return oneOrNone(getSetAllPendingResetPasswordMailsStatusesToUnusedQuery(email));
}

export function setResetPasswordMailStatusToExpired(id) {
    return oneOrNone(getSetResetPasswordMailExpiredByIdQuery(id));
}

export function setResetPasswordMailStatusToUsed(id) {
    return oneOrNone(getSetResetPasswordMailUsedByIdQuery(id));
}

export function getResetPasswordMailByEmail(email) {
    return oneOrNone(getSelectResetPasswordMailByEmailQuery(email));
}

export function getResetPasswordMailById(id) {
    return oneOrNone(getSelectResetPasswordMailByIdQuery(id));
}

export function insertResetPasswordMail(mail) {
    return oneOrNone(getInsertResetPasswordMailQuery(mail));
}
