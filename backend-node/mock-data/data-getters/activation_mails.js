import { oneOrNone } from '../../app/db';
import { getSelectActivationMailByEmailQuery } from '../../app/helpers/sql';

export async function getActivationMailByEmail(email) {
    return oneOrNone(getSelectActivationMailByEmailQuery(email));
}
