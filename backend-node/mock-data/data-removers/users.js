import { manyOrNone } from '../../app/db';
import {getDeleteUsersByEmailsQuery,getSelectUsersByEmailsQuery} from '../../app/helpers/sql';

export function deleteUsersByEmailsQuery(emails) {
    return manyOrNone(getDeleteUsersByEmailsQuery(emails));
}

export function getUsersByEmailsQuery(emails) {
    return manyOrNone(getSelectUsersByEmailsQuery(emails));
}
