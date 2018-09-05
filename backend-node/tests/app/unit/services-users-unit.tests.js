import {  TABLES, ERROR_MESSAGES } from '../../../app/constants';
import { oneOrNone, manyOrNone } from '../../../app/db';
import { addUser,
    getUserByEmail,
    deleteUser,
    getUser,
    updateUser } from '../../../app/services/users';
import { getUpdateUserByIdQuery } from '../../../app/sql-queries/users';
import { getDeleteUsersByEmailsQuery } from '../../../app/helpers/sql';
import { formatUserForResponse, formatUserForInsertion } from '../../../app/helpers/formatters';
import { values, keys } from 'lodash';
import { getMockData, deleteMockData } from '../../../mock-data';

const chai = require('chai');
const expect = chai.expect;

const isOnly = false;
const desc = isOnly ? describe.only : describe;
const table = TABLES.USERS.NAME;
const cols = TABLES.USERS.COLUMNS;

desc('Services / users unit', () => {
    let data;

    before(async function() {
        data = await getMockData();
    });

    after(async () => {
       await deleteMockData(data);
    });

    describe('services / USERS', async () => {

        describe('getUserByEmail (email)', async () => {
            it('should return user by email', async function() {
                const users = values(data.notActivatedUsers);

                const results = await Promise.all(users.map(user =>
                    getUserByEmail(user.email)
                ));

                expect(results).to.not.be.empty;
                results.forEach((res, i) => {
                    const user = users[i];
                    res.should.be.an('object');
                    const userForComparison = {
                        [cols.ID]: user[cols.ID],
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.PASSWORD]: user[cols.PASSWORD],
                        [cols.KEY]: user[cols.KEY],
                        [cols.FIRST_NAME]: user[cols.FIRST_NAME],
                        [cols.LAST_NAME]: user[cols.LAST_NAME],
                        [cols.IS_ACTIVE]: user[cols.IS_ACTIVE],
                    };
                    expect(res).to.deep.equal(userForComparison);
                });
            });
        });

        describe('addUser (obj)', async () => {
            it('should insert user', async function() {
                const users = values(data.rawUsers);
                let emailsForTest = [];

                const results = await Promise.all(users.map(rawUser => {
                    const req = {
                        [cols.FIRST_NAME]: rawUser[cols.FIRST_NAME],
                        [cols.LAST_NAME]: rawUser[cols.LAST_NAME],
                        [cols.EMAIL]: rawUser[cols.EMAIL],
                        [cols.KEY]: rawUser[cols.KEY],
                        [cols.PASSWORD]: rawUser[cols.PASSWORD]
                    };
                    emailsForTest.push(rawUser[cols.EMAIL]);
                    return addUser(req);
                }));

                expect(results).to.not.be.empty;
                results.forEach((res, i) => {
                    const user = users[i];
                    const userForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.PASSWORD]: user[cols.PASSWORD],
                        [cols.FIRST_NAME]: user[cols.FIRST_NAME],
                        [cols.LAST_NAME]: user[cols.LAST_NAME],
                        [cols.IS_ACTIVE]: user[cols.IS_ACTIVE],
                    };
                    res[cols.ID].should.be.an('string');
                    res.should.be.an('object');
                    expect(res).to.deep.include(userForComparison);
                });

                await manyOrNone(getDeleteUsersByEmailsQuery(emailsForTest));
            });
        });

        describe('deleteUser (id)', async () => {
            it('should remove user from db', async () => {
                const users = values(data.rawUsers);
                let emailsForTest = [];

                const addedUsers = await Promise.all(users.map(rawUser => {
                    const req = formatUserForInsertion(rawUser);
                    emailsForTest.push(rawUser[cols.EMAIL]);
                    return addUser(req);
                }));

                const results = await Promise.all(addedUsers.map(user =>
                    deleteUser(user[cols.ID])
                ));

                expect(results).to.not.be.empty;
                results.forEach((res, i) => {
                    const user = users[i];
                    const userForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.PASSWORD]: user[cols.PASSWORD],
                        [cols.FIRST_NAME]: user[cols.FIRST_NAME],
                        [cols.LAST_NAME]: user[cols.LAST_NAME],
                        [cols.IS_ACTIVE]: user[cols.IS_ACTIVE],
                    };
                    res[cols.ID].should.be.an('string');
                    res.should.be.an('object');
                    expect(res).to.deep.include(userForComparison);
                });
            });
        });

        describe('getUser (id)', async () => {
            it('should return user by id', async () => {
                const userKeys = keys(data.notActivatedUsers);
                const users = values(data.notActivatedUsers);

                const results = await Promise.all(userKeys.map(key =>
                    getUser(key)
                ));

                expect(results).to.not.be.empty;
                results.forEach((res, i) => {
                    const user = users[i];
                    res.should.be.an('object');
                    const userForComparison = {
                        [cols.ID]: user[cols.ID],
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.PASSWORD]: user[cols.PASSWORD],
                        [cols.KEY]: user[cols.KEY],
                        [cols.FIRST_NAME]: user[cols.FIRST_NAME],
                        [cols.LAST_NAME]: user[cols.LAST_NAME],
                        [cols.IS_ACTIVE]: user[cols.IS_ACTIVE],
                    };
                    expect(res).to.deep.equal(userForComparison);
                });
            });
        });

        describe('updateUser (id, obj)', async () => {
            it('should update user data', async () => {
                const usersKeys = keys(data.notActivatedUsers);
                const users = values(data.notActivatedUsers);

                const usersKeysActivated = keys(data.activatedUsers);
                const usersActivated = values(data.activatedUsers);
                let pases = [];

                const results = await Promise.all(usersKeys.map(key =>
                    updateUser(key,{[cols.IS_ACTIVE]: true})
                ));

                const results2 = await Promise.all(usersKeysActivated.map((key,i) => {
                    pases.push(usersActivated[cols.PASSWORD]);
                    return updateUser(key,{[cols.PASSWORD]: `new password ${i}`});
                }));

                expect(results).to.not.be.empty;
                results.forEach((res, i) => {
                    const user = users[i];
                    res.should.be.an('object');
                    const userForComparison = formatUserForResponse(user);
                    userForComparison[cols.IS_ACTIVE] = true;
                    expect(res).to.deep.include(userForComparison);
                });

                Promise.all(usersKeys.map(key =>
                    oneOrNone(getUpdateUserByIdQuery(key, {[cols.IS_ACTIVE]:false}))
                ));

                expect(results2).to.not.be.empty;
                results2.forEach((res, i) => {
                    const user = usersActivated[i];
                    const userForComparison = formatUserForResponse(user);
                    userForComparison[cols.PASSWORD] = `new password ${i}`;
                    res.should.be.an('object');
                    expect(res).to.deep.include(userForComparison);
                });

                Promise.all(usersKeysActivated.map((key, i)=>
                    oneOrNone(getUpdateUserByIdQuery(key, {[cols.PASSWORD]: pases[i]}))
                ));
            });
        });
    });
});
