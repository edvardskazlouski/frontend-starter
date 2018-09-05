import { getSelectUserByEmailQuery } from '../sql-queries';
import { oneOrNone } from '../db';
import {
    getDeleteUserByIdQuery,
    getInsertUserQuery,
    getSelectUserByIdQuery,
    getUpdateUserByIdQuery,
} from '../sql-queries/users';

export function getUserByEmail(email) {
    return oneOrNone(
        getSelectUserByEmailQuery(email),
    );
}

export function addUser(user) {
    return oneOrNone(
        getInsertUserQuery(user),
    );
}

export function deleteUser(id) {
    return oneOrNone(
        getDeleteUserByIdQuery(id),
    );
}

export function getUser(id) {
    return oneOrNone(
        getSelectUserByIdQuery(id),
    );
}

export function updateUser(id, data) {
    return oneOrNone(
        getUpdateUserByIdQuery(id, data),
    );
}
