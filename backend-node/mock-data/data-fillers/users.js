import { TABLES } from '../../app/constants/tables';
import { many } from '../../app/db';
import { getInsertUsersQuery } from '../../app/helpers/sql';
import {
    insertActivationMail,
    setActivationMailStatusToUsed,
    encryptPassword,
} from '../../app/services';

const table = TABLES.USERS;
const cols = table.COLUMNS;

export async function fillUsers(users) {
    const passwordPairs = await Promise.all(users.map(user => encryptPassword(user[cols.PASSWORD])));

    const values = users.map((user, i) => ({
        [cols.EMAIL]: user[cols.EMAIL],
        [cols.PASSWORD]: passwordPairs[i].encryptedPassword,
        [cols.FIRST_NAME]: user[cols.FIRST_NAME],
        [cols.LAST_NAME]: user[cols.LAST_NAME],
        [cols.IS_ACTIVE]: user[cols.IS_ACTIVE],
        [cols.KEY]: passwordPairs[i].salt,
    }));

    const insertedUsers = await many(getInsertUsersQuery(values));

    if(insertedUsers.length !== users.length) {
        throw new Error({
            message: 'Not all users were added to database',
            passedEmails: users.map(u => u[cols.EMAIL]),
            insertedEmails: insertedUsers.map(u => u[cols.EMAIL]),
        });
    }
    await Promise.all(insertedUsers.map(user =>
        insertActivationMail({email: user[cols.EMAIL]})
    ));

    const activatedUsers = insertedUsers.filter(user => user[cols.IS_ACTIVE]);

    if (activatedUsers.length){
        await Promise.all(activatedUsers.map(fillActivationEmail));
    }

    const result = {};

    insertedUsers.forEach((user) => {
        const rawUser = users.find(u => u[cols.EMAIL] === user[cols.EMAIL]);
        if(rawUser) {
            result[user.id] = user;
            result[user.id].rawPassword = rawUser.password;
        } else {
            throw new Error({
                message: 'Inserted',
                passedEmails: users.map(u => u[cols.EMAIL]),
                insertedEmails: insertedUsers.map(u => u[cols.EMAIL]),
            });
        }
    });
    return result;
}

async function fillActivationEmail(user) {
        await setActivationMailStatusToUsed(user.id);
}
