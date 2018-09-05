import { manyOrNone } from '../../app/db';
import { getDeleteResetPasswordMailsByEmailsQuery } from '../../app/helpers/sql';

export function deleteResetPasswordMailsByEmailsQuery(emails) {
    return manyOrNone(getDeleteResetPasswordMailsByEmailsQuery(emails));
}
