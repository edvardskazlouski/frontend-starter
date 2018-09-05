import { manyOrNone } from '../../app/db';
import {getDeleteActivationMailsByEmailsQuery} from '../../app/helpers/sql';

export function deleteActivationMailsByEmailsQuery(emails) {
    return manyOrNone(getDeleteActivationMailsByEmailsQuery(emails));
}
