import { oneOrNone } from '../db';
import { getSelectBusinessOwnerRoleIdQuery, getSelectUserRoleByIdQuery} from '../sql-queries';

export function getBusinessOwnerRoleId() {
    return oneOrNone(getSelectBusinessOwnerRoleIdQuery());
}

export function getUserRoleById(id){
    return oneOrNone(getSelectUserRoleByIdQuery(id));
}
