import app from '../../../../app/app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { ROUTES, TABLES, ERROR_MESSAGES } from '../../../../app/constants';
import { values, keys } from 'lodash';
import { getMockData } from '../../../../mock-data';
import { oneOrNone, manyOrNone } from '../../../../app/db';
import { getUpdateUserByIdQuery,
    getSetAllPendingActivationMailsStatusesToUnusedQuery } from '../../../../app/sql-queries';
import {getDeleteResetPasswordMailsByEmailsQuery,
    getSetActivationTimeEmailQuery,
    getDeleteActivationMailsByEmailsQuery,
    getDeleteUsersByEmailsQuery } from '../../../../app/helpers/sql';
import { getActivationMailByEmail } from '../../../../mock-data/data-getters';
import { MakeReqForCreateProfile } from '../../../../app/helpers/formatters';
import { deleteMockData } from '../../../../mock-data';
import { createRoute } from '../../../../helpers/route';
import { getTokenForUser } from '../../../../app/services';
import moment from 'moment';

chai.use(chaiHttp);
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const isOnly = false;
const desc = isOnly ? describe.only : describe;
const table = TABLES.USERS.NAME;
const userCols = TABLES.USERS.COLUMNS;
const ValidationErrors = ERROR_MESSAGES.VALIDATION;
const ProfileErrors = ERROR_MESSAGES.PROFILE;

desc('Profile API', () => {
    let data;
    before(async function() {
        data = await getMockData();
    });

    after(async () => {
        await deleteMockData(data);
    });

    describe('POST /PROFILE', async () => {

        describe('/CREATE', async () => {

            it('should create new profiles', async function() {
                this.timeout(35000);
                // more than 12 can fail
                const GeneratedValidUsers = values(data.rawUsers);
                let emailsToDelete = [];

                const reqArray = GeneratedValidUsers.map(user => {
                    emailsToDelete.push(user.email);
                    return { profileData: MakeReqForCreateProfile(user) };
                });

                const responses = await Promise.all(
                    reqArray.map(req => chai.request(app)
                        .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.CREATE))
                        .send(req))
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(200);
                    expect(response.body).to.deep.include({
                        success: true,
                    });
                });

                // keep order !
                await manyOrNone(getDeleteActivationMailsByEmailsQuery(emailsToDelete));
                await manyOrNone(getDeleteUsersByEmailsQuery(emailsToDelete));
            });

            it(`should return err : ${ValidationErrors.VALUE_NOT_PASSED.code} in createProfile  (no email) `, async () => {
                let GeneratedValidUsers = values(data.rawUsers);

                const reqArray = GeneratedValidUsers.map(user=> {
                    let req = { profileData: MakeReqForCreateProfile(user) };
                    req.profileData[userCols.EMAIL] = null;
                    return req;
                });

                const responses = await Promise.all(
                    reqArray.map(req => chai.request(app)
                        .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.CREATE))
                        .send(req))
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.INVALID_PROFILE_DATA,
                        data: {[userCols.EMAIL]: ValidationErrors.VALUE_NOT_PASSED}
                    });
                });
            });

            it(`should return err : ${ValidationErrors.INVALID_VALUE.code} in createProfile  (notValid email)`, async () => {
                let GeneratedValidUsers = values(data.rawUsers);

                const reqArray = GeneratedValidUsers.map((user, i) => {
                    let req = { profileData: MakeReqForCreateProfile(user) };
                    req.profileData[userCols.EMAIL] = `${i}me@mailcom`;
                    return req;
                });

                const responses = await Promise.all(
                    reqArray.map(req => chai.request(app)
                        .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.CREATE))
                        .send(req))
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.INVALID_PROFILE_DATA,
                        data: {[userCols.EMAIL]: ValidationErrors.INVALID_VALUE}
                    });
                });
            });

            it(`should return err : ${ValidationErrors.VALUE_NOT_PASSED.code} in createProfile (no password)`, async () => {
                let GeneratedValidUsers = values(data.rawUsers);

                const reqArray = GeneratedValidUsers.map(user => {
                    let req = { profileData: MakeReqForCreateProfile(user) };
                    req.profileData[userCols.PASSWORD] = null;
                    return req;
                });

                const responses = await Promise.all(
                    reqArray.map(req => chai.request(app)
                        .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.CREATE))
                        .send(req))
                );

                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.INVALID_PROFILE_DATA,
                        data: {[userCols.PASSWORD]: ValidationErrors.VALUE_NOT_PASSED}
                    });

                });
            });

            it(`should return err : ${ValidationErrors.SHOULD_BE_STRING.code} in createProfile (notValid password)`, async function() {
                this.timeout(7000);
                let GeneratedValidUsers = values(data.rawUsers);

                const reqArray = GeneratedValidUsers.map(user => {
                    let req = { profileData: MakeReqForCreateProfile(user) };
                    req.profileData[userCols.PASSWORD] = 12345;
                    return req;
                });

                const responses = await Promise.all(
                    reqArray.map(req => chai.request(app)
                        .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.CREATE))
                        .send(req))
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.INVALID_PROFILE_DATA,
                        data: {[userCols.PASSWORD]: ValidationErrors.SHOULD_BE_STRING}
                    });
                });
            });

            it(`should return err : ${ValidationErrors.VALUE_NOT_PASSED.code} in createProfile (no firstname)`, async function() {
                this.timeout(2000);
                let GeneratedValidUsers = values(data.rawUsers);

                const reqArray = GeneratedValidUsers.map(user => {
                    let req = { profileData: MakeReqForCreateProfile(user) };
                    req.profileData[userCols.FIRST_NAME] = null;
                    return req;
                });

                const responses = await Promise.all(
                    reqArray.map(req => chai.request(app)
                        .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.CREATE))
                        .send(req))
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.INVALID_PROFILE_DATA,
                        data:{[userCols.FIRST_NAME]:ValidationErrors.VALUE_NOT_PASSED}
                    });
                    response.should.have.property('status');
                    response.status.should.equal(400);

                });
            });

            it(`should return err : ${ValidationErrors.SHOULD_BE_STRING.code} in createProfile (notValid firstname)`, async () => {
                let GeneratedValidUsers = values(data.rawUsers);

                const reqArray = GeneratedValidUsers.map(user => {
                    let req = { profileData: MakeReqForCreateProfile(user) };
                    req.profileData[userCols.FIRST_NAME] = 12345;
                    return req;
                });

                const responses = await Promise.all(
                    reqArray.map(req => chai.request(app)
                        .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.CREATE))
                        .send(req))
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.INVALID_PROFILE_DATA,
                        data: {[userCols.FIRST_NAME]: ValidationErrors.SHOULD_BE_STRING}
                    });
                    response.should.have.property('status');
                    response.status.should.equal(400);
                });
            });

            it(`should return err : ${ValidationErrors.VALUE_NOT_PASSED.code} in createProfile (no lastname)`, async () => {
                let GeneratedValidUsers = values(data.rawUsers);

                const reqArray = GeneratedValidUsers.map(user => {
                    let req = { profileData: MakeReqForCreateProfile(user) };
                    req.profileData[userCols.LAST_NAME] = null;
                    return req;
                });

                const responses = await Promise.all(
                    reqArray.map(req => chai.request(app)
                        .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.CREATE))
                        .send(req))
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.INVALID_PROFILE_DATA,
                        data:{[userCols.LAST_NAME]:ValidationErrors.VALUE_NOT_PASSED}
                    });
                    response.should.have.property('status');
                    response.status.should.equal(400);
                });
            });

            it(`should return err : ${ValidationErrors.SHOULD_BE_STRING.code} in createProfile (notValid lastname)`, async function() {
                let GeneratedValidUsers = values(data.rawUsers);

                const reqArray = GeneratedValidUsers.map(user => {
                    let req = { profileData: MakeReqForCreateProfile(user) };
                    req.profileData[userCols.LAST_NAME] = 12345;
                    return req;
                });

                const responses = await Promise.all(
                    reqArray.map(req =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.CREATE))
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.INVALID_PROFILE_DATA,
                        data: {[userCols.LAST_NAME]: ValidationErrors.SHOULD_BE_STRING}
                    });
                });
            });

            it(`should return err : ${ProfileErrors.EMAIL_ALREADY_USED.code} in createProfile (existing email)`, async function() {
                this.timeout(35000);
                const GeneratedValidUsers = values(data.activatedUsers);

                const reqArray = GeneratedValidUsers.map(user =>
                    ({ profileData: MakeReqForCreateProfile(user) })
                );

                const responses = await Promise.all(
                    reqArray.map(req =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.CREATE))
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach((response,i) => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.EMAIL_ALREADY_USED,
                        data: { [userCols.EMAIL]: reqArray[i].profileData.email }
                    });
                });
            });
        });

        describe('/ACTIVATE', async ()=> {

            it('should activate users' ,async function() {
                this.timeout(7000);
                const notActivatedUsers = values(data.notActivatedUsers);
                const tokens = await Promise.all(notActivatedUsers.map(user => getTokenForUser(user)));

                const hashes = await Promise.all(notActivatedUsers.map(user =>
                    getActivationMailByEmail(user.email)
                ));

                const reqArray = await Promise.all(notActivatedUsers.map(user => {
                    const mailHash = hashes.find(h => h.email === user.email);

                    return ({
                        hash: mailHash.id,
                    });
                }));

                const responses = await Promise.all(
                    reqArray.map((req, i) =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.ACTIVATE))
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

                await Promise.all(notActivatedUsers.map(user =>
                    oneOrNone(getUpdateUserByIdQuery(user.id, {[TABLES.USERS.COLUMNS.IS_ACTIVE]: false,}))
                ));
                await Promise.all(notActivatedUsers.map(user =>
                    oneOrNone(getSetAllPendingActivationMailsStatusesToUnusedQuery(user.email))
                ));
            });

            it(`should return err : ${ProfileErrors.USER_ALREADY_ACTIVATED.code} in activateUser (already active)`, async function() {
                this.timeout(7000);
                const users = values(data.activatedUsers);
                const tokens = await Promise.all(users.map( user => getTokenForUser(user)));

                const hashes = await Promise.all(users.map(user =>
                    getActivationMailByEmail(user.email)
                ));

                const hashesTokens = await Promise.all(users.map(user => {
                    user[userCols.IS_ACTIVE] = true;
                    const mailHash = hashes.find(h => h.email === user.email);

                    return ({
                        mailActivationHash: mailHash.id,
                    });
                }));

                const responses = await Promise.all(
                    hashesTokens.map((req, i) =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.ACTIVATE))
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
                        error: ProfileErrors.USER_ALREADY_ACTIVATED,
                    });
                });
            });

            it(`should return err : ${ProfileErrors.INVALID_HASH.code} in activateUser (invalid hash)`, async () => {
                const users = values(data.notActivatedUsers);
                const tokens = await Promise.all(users.map( user => getTokenForUser(user)));

                const hashes = await Promise.all(users.map(user =>
                    getActivationMailByEmail(user.email)
                ));

                const hashesTokens = await Promise.all(users.map(user => {
                    const mailHash = hashes.find(h => h.email === user.email);
                    return ({
                        mailActivationHash: mailHash.id.slice(2),
                    });
                }));

                const responses = await Promise.all(
                    hashesTokens.map((req, i) =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.ACTIVATE))
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
                        error: ProfileErrors.INVALID_HASH,
                    });
                });
            });

            it(`should return err : ${ProfileErrors.ACTIVATION_LINK_EXPIRED.code} in activateUser (link already used)`, async function() {
                this.timeout(7000);
                const users = values(data.notActivatedUsers);
                const tokens = await Promise.all(users.map( user => getTokenForUser(user)));

                const hashes = await Promise.all(users.map(user =>
                    getActivationMailByEmail(user.email)
                ));

                const hashesTokens = await Promise.all(users.map(user => {
                    const mailHash = hashes.find(h => h.email === user.email);
                    return ({
                        hash: mailHash.id,
                    });
                }));

                const expiredDate = moment().subtract(7, 'days').utc().format();
                await Promise.all(users.map(user =>
                    oneOrNone(getSetActivationTimeEmailQuery(user.email, expiredDate))
                ));

                const responses = await Promise.all(
                    hashesTokens.map((req, i) =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.ACTIVATE))
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
                        error: ProfileErrors.ACTIVATION_LINK_EXPIRED,
                    });
                });

                const nowDate = moment().utc().format();

                await Promise.all(values(data.activatedUsers).map(user =>
                    oneOrNone(getSetActivationTimeEmailQuery(user.email,nowDate))
                ));
            });

            it(`should return err : ${ProfileErrors.HASH_USER_MISMATCH.code} in activateUser (wrong activation link)`, async function() {
                this.timeout(8000);
                let mailHashes = [];
                const users = values(data.activatedUsers);
                const usersNotActivated = values(data.notActivatedUsers);
                const tokens = await Promise.all(usersNotActivated.map( user => getTokenForUser(user)));

                const mails = await Promise.all(users.map(user =>
                    getActivationMailByEmail(user.email)
                ));
                mails.forEach(hash =>{mailHashes.push(hash.id);});

                let wrongOrderHashes = [...mailHashes.slice(1,mailHashes.length), mailHashes[0]];

                const responses = await Promise.all(
                    wrongOrderHashes.map((req, i) =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.ACTIVATE))
                            .set({'x-access-token': tokens[i]})
                            .send({ hash: req })
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.HASH_USER_MISMATCH,
                    });
                });
            });
        });

        describe('/RESEND_ACTIVATION', async ()=> {

            it('should resend ActivationMail', async function() {
                this.timeout(30000);
                const users = values(data.notActivatedUsers);
                const tokens = await Promise.all(users.map( user => getTokenForUser(user)));

                const responses = await Promise.all(
                    tokens.map(token =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.RESEND_ACTIVATION))
                            .set({'x-access-token': token})
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
            });

            it(`should return err : ${ProfileErrors.USER_ALREADY_ACTIVATED.code} in resendActivationMail (already active)`, async () => {
                const users = values(data.notActivatedUsers);
                const tokens = await Promise.all(users.map( user => getTokenForUser(user)));

                await Promise.all(users.map(user =>
                    oneOrNone(getUpdateUserByIdQuery(user.id, {
                            [TABLES.USERS.COLUMNS.IS_ACTIVE]: true,
                        })
                    )));

                const responses = await Promise.all(
                    tokens.map(token =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.RESEND_ACTIVATION))
                            .set({'x-access-token': token})
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.USER_ALREADY_ACTIVATED,
                    });
                });

                await Promise.all(users.map(user => {
                    return oneOrNone(getUpdateUserByIdQuery(user.id, {
                        [TABLES.USERS.COLUMNS.IS_ACTIVE]: false,
                    }));
                }));
            });
        });

        describe('/SEND_RESET_PASSWORD_MAIL', async ()=> {

            it('should resend sendResetPasswordMail', async function() {
                this.timeout(30000);
                const users = values(data.activatedUsers);

                const emails = await Promise.all(users.map(user => user.email));

                const responses = await Promise.all(
                    emails.map(req =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.SEND_RESET_PASSWORD_MAIL))
                            .send({ email: req })
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(200);
                });

                await manyOrNone(getDeleteResetPasswordMailsByEmailsQuery(emails));
            });

            it(`should return err : ${ValidationErrors.INVALID_EMAIL_FORMAT.code} in sendResetPasswordMail (invalid email)`, async function() {
                this.timeout(5000);
                const users = values(data.activatedUsers);
                const tokens = data.accessTokens;

                const badEmails = users.map((user,i) => ({email: `${i}bademail@com`,}));

                const responses = await Promise.all(
                    badEmails.map((req, i) =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.SEND_RESET_PASSWORD_MAIL))
                            .set({'x-access-token': tokens[i]})
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach((response,i) => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ValidationErrors.INVALID_EMAIL_FORMAT,
                        data: {[userCols.EMAIL]: badEmails[i].email}
                    });
                });
            });

            it(`should return err : ${ProfileErrors.USER_NOT_EXIST.code} in sendResetPasswordMail (no user)`, async function() {
                this.timeout(5000);
                const users = values(data.activatedUsers);

                const reqEmails = users.map((user,i) => ({
                        email: `Unusedemail${i}@gmail.com`
                    })
                );

                const responses = await Promise.all(
                    reqEmails.map(req =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.SEND_RESET_PASSWORD_MAIL))
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach((response,i) => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.USER_NOT_EXIST,
                        data: {[userCols.EMAIL]: reqEmails[i].email}
                    });
                });
            });

            it(`should return err : ${ProfileErrors.UNACTIVATED_PROFILE.code} in sendResetPasswordMail (u unactive)`, async () => {
                const users = values(data.notActivatedUsers);

                const reqTokens = users.map(user => ({
                    email: user.email })
                );

                const responses = await Promise.all(
                    reqTokens.map(req =>
                        chai.request(app)
                            .post(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.SEND_RESET_PASSWORD_MAIL))
                            .send(req)
                    )
                );

                expect(responses).to.not.be.empty;
                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    expect(response.body).to.deep.include({
                        success: false,
                        error: ProfileErrors.UNACTIVATED_PROFILE,
                    });
                });
            });
        });
    });
});
