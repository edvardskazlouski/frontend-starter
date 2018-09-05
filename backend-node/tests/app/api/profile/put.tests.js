import app from '../../../../app/app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { oneOrNone, manyOrNone } from '../../../../app/db';
import { createRoute } from '../../../../helpers';
import { ROUTES, TABLES, ERROR_MESSAGES } from '../../../../app/constants';
import { values, keys } from 'lodash';
import { getMockData, deleteMockData } from '../../../../mock-data';
import { encryptPassword } from '../../../../app/services';
import { getUpdateUserByIdQuery,
    getSetResetPasswordMailUsedByIdQuery,
    getInsertResetPasswordMailQuery } from '../../../../app/sql-queries';
import {
    getDeleteResetPasswordMailsByEmailsQuery,
    getSetPasswordMailTimeByEmailQuery } from '../../../../app/helpers/sql';

chai.use(chaiHttp);
const assert = chai.assert;
const expect = chai.expect;

const isOnly = false;
const desc = isOnly ? describe.only : describe;
const table = TABLES.USERS.NAME;
const userCols = TABLES.USERS.COLUMNS;
const ValidationErrors = ERROR_MESSAGES.VALIDATION;
const ProfileErrors = ERROR_MESSAGES.PROFILE;

desc('Profile API', () => {
    let data;

    before(async function () {
        data = await getMockData();
    });

    after(async () => {
        await deleteMockData(data);
    });

    describe('PUT /profile', async ()=> {

        describe('PUT PROFILE/RESET_PASSWORD', async ()=> {

            it('should reset password ', async () => {
                const users = values(data.activatedUsers);
                let emails = [];

                const passwordMails = await Promise.all(users.map(user => {
                    emails.push(user.email);
                    return oneOrNone(getInsertResetPasswordMailQuery({email: user.email}));
                }));

                const reqArray = users.map(user => {
                    const overlap = passwordMails.find(p => p[userCols.EMAIL] === user[userCols.EMAIL]);

                    return ({
                        hash: overlap.id,
                        newPassword: user.rawPassword,
                    });
                });

                const responses = await Promise.all(
                    reqArray.map(req =>
                        chai.request(app)
                            .put(createRoute(ROUTES.PROFILE.BASE,ROUTES.PROFILE.RESET_PASSWORD))
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(200);
                    expect(response.body).to.deep.include({
                        success: true,
                    });
                });

                await manyOrNone(getDeleteResetPasswordMailsByEmailsQuery(emails));
            });

            it(`should return err : ${ProfileErrors.RESET_PASSWORD_LINK_EXPIRED.code} in resetPassword (bad link)`, async () => {
                const users = values(data.activatedUsers);
                let emails = [];

                const resetMails = await Promise.all(users.map(user => {
                    emails.push(user.email);
                    return oneOrNone(getInsertResetPasswordMailQuery({email: user.email}));
                }));

                const reqArray = users.map(user => {
                    const overlap = resetMails.find(r => r[userCols.EMAIL] === user[userCols.EMAIL]);
                    return ({
                        hash: overlap.id.slice(2),
                        newPassword: user.rawPassword,
                    });
                });

                const responses = await Promise.all(
                    reqArray.map(req =>
                        chai.request(app)
                            .put(createRoute(ROUTES.PROFILE.BASE,ROUTES.PROFILE.RESET_PASSWORD))
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.RESET_PASSWORD_LINK_EXPIRED,
                    });
                });

                await manyOrNone(getDeleteResetPasswordMailsByEmailsQuery(emails));
            });

            it(`should return err : ${ProfileErrors.INVALID_RESET_PASSWORD_DATA.code} in resetPassword (bad password)`, async () => {
                const users = values(data.activatedUsers);
                const emails = [];

                const resetMails = await Promise.all(users.map(user => {
                    emails.push(user.email);
                    return oneOrNone(getInsertResetPasswordMailQuery({ email: user.email }));
                }));

                const reqArray = await Promise.all(users.map(user => {
                    const overlap = resetMails.find(r => r[userCols.EMAIL] === user[userCols.EMAIL]);

                    return ({
                        hash: overlap.id,
                        newPassword: 12345,
                    });
                }));

                const responses = await Promise.all(
                    reqArray.map(req =>
                        chai.request(app)
                            .put(createRoute(ROUTES.PROFILE.BASE,ROUTES.PROFILE.RESET_PASSWORD))
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.INVALID_RESET_PASSWORD_DATA,
                    });
                });

                await manyOrNone(getDeleteResetPasswordMailsByEmailsQuery(emails));
            });

            it(`should return err : ${ProfileErrors.RESET_PASSWORD_LINK_EXPIRED.code} in resetPassword (link alredy used)`, async () => {
                const users = values(data.activatedUsers);
                let emails = [];

                const resetMails = await Promise.all(users.map(user => {
                    emails.push(user.email);
                    return oneOrNone(getInsertResetPasswordMailQuery({email: user.email}));
                }));

                await Promise.all(resetMails.map(user =>
                    oneOrNone(getSetResetPasswordMailUsedByIdQuery(user.id))
                ));

                const reqArray = users.map(user => {
                    const overlap = resetMails.find(r => r[userCols.EMAIL] === user[userCols.EMAIL]);
                    emails.push(user.email);

                    return ({
                        hash: overlap.id,
                        newPassword: user.rawPassword,
                    });
                });

                const responses = await Promise.all(
                    reqArray.map(req =>
                        chai.request(app)
                            .put(createRoute(ROUTES.PROFILE.BASE,ROUTES.PROFILE.RESET_PASSWORD))
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.RESET_PASSWORD_LINK_EXPIRED,
                    });

                });
                await manyOrNone(getDeleteResetPasswordMailsByEmailsQuery(emails));
            });

            it(`should return err : ${ProfileErrors.RESET_PASSWORD_LINK_EXPIRED.code} in resetPassword (too late date)`, async () => {
                const users = values(data.activatedUsers);
                let emails = [];

                const resetMails = await Promise.all(users.map(user => {
                    emails.push(user.email);
                    return oneOrNone(getInsertResetPasswordMailQuery({ email: user.email }));
                }));

                const lateDate = 'July 21, 2015 01:15:00';
                await Promise.all(users.map(user =>
                    oneOrNone(getSetPasswordMailTimeByEmailQuery(user.email,lateDate))
                ));

                const reqArray = users.map(user => {
                    const overlap = resetMails.find(r => r[userCols.EMAIL] === user[userCols.EMAIL]);
                    emails.push(user.email);

                    return ({
                        hash: overlap.id,
                        newPassword: user.rawPassword,
                    });
                });

                const responses = await Promise.all(
                    reqArray.map(req =>
                        chai.request(app)
                            .put(createRoute(ROUTES.PROFILE.BASE,ROUTES.PROFILE.RESET_PASSWORD))
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.RESET_PASSWORD_LINK_EXPIRED,
                    });

                });

                await manyOrNone(getDeleteResetPasswordMailsByEmailsQuery(emails));
            });
        });

        describe('PUT PROFILE/UPDATE_PASSWORD', async ()=> {

            it('should updatePassword ', async ()=>{
                const users = values(data.activatedUsers);
                const usersIds = keys(data.activatedUsers);
                const tokens = data.accessTokens;

                const reqArray = users.map((user,i) =>
                    ({
                        oldPassword: user.rawPassword,
                        newPassword: `${user.rawPassword}${i}`,
                    })
                );

                const responses = await Promise.all(
                    reqArray.map( (req, i) =>
                        chai.request(app)
                            .put(createRoute(ROUTES.PROFILE.BASE,ROUTES.PROFILE.UPDATE_PASSWORD))
                            .set({'x-access-token': tokens[i]})
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(200);
                    expect(response.body).to.deep.include({
                        success: true,
                    });
                });

                const encrypts = await Promise.all(users.map(user =>
                    encryptPassword(user.rawPassword)
                ));

                await Promise.all(users.map((user,i) =>
                    oneOrNone(getUpdateUserByIdQuery(
                        usersIds[i],
                        {
                            [TABLES.USERS.COLUMNS.PASSWORD]:  encrypts[i].password,
                            [TABLES.USERS.COLUMNS.KEY]: encrypts[i].salt,
                        },
                    ))
                ));
            });

            it(`should return err : ${ProfileErrors.INVALID_RESET_PASSWORD_DATA.code} in updatePassword (bad password1)`, async () => {
                const users = values(data.activatedUsers);
                const tokens = data.accessTokens;

                const reqArray = users.map(user =>
                    ({
                        oldPassword: user.rawPassword,
                        newPassword: 6666,
                    })
                );

                const responses = await Promise.all(
                    reqArray.map((req, i) =>
                        chai.request(app)
                            .put(createRoute(ROUTES.PROFILE.BASE,ROUTES.PROFILE.UPDATE_PASSWORD))
                            .set({'x-access-token': tokens[i]})
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.INVALID_RESET_PASSWORD_DATA,
                    });
                });
            });

            it(`should return err : ${ProfileErrors.INVALID_RESET_PASSWORD_DATA.code} in updatePassword (bad password2)`, async () => {
                const users = values(data.activatedUsers);
                const tokens = data.accessTokens;

                const reqArray = users.map(user =>
                    ({
                        oldPassword: 12345,
                        newPassword: user.rawPassword,
                    })
                );

                const responses = await Promise.all(
                    reqArray.map((req, i) =>
                        chai.request(app)
                            .put(createRoute(ROUTES.PROFILE.BASE,ROUTES.PROFILE.UPDATE_PASSWORD))
                            .set({'x-access-token': tokens[i]})
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.INVALID_RESET_PASSWORD_DATA,
                    });
                });
            });

            it(`should return err : ${ProfileErrors.WRONG_PASSWORD.code} in updatePassword (wrong password)`, async () => {
                const users = values(data.activatedUsers);
                const tokens = data.accessTokens;

                const reqArray = users.map((user, i) =>
                    ({
                        oldPassword: `${user.rawPassword}${i}`,
                        newPassword: user.rawPassword,
                    })
                );

                const responses = await Promise.all(
                    reqArray.map((req, i) =>
                        chai.request(app)
                            .put(createRoute(ROUTES.PROFILE.BASE,ROUTES.PROFILE.UPDATE_PASSWORD))
                            .set({'x-access-token': tokens[i]})
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.WRONG_PASSWORD,
                    });
                });
            });
        });
    });
});
