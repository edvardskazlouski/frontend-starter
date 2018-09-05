import { TABLES, ERROR_MESSAGES, RESET_PASSWORD_MAILS_STATUSES } from '../../../app/constants';
import { oneOrNone } from '../../../app/db';
import {updateExistingResetPasswordMails,
    insertResetPasswordMail,
    setResetPasswordMailStatusToExpired,
    setResetPasswordMailStatusToUsed,
    getResetPasswordMailByEmail,
    getResetPasswordMailById
} from '../../../app/services';
import { getSelectResetPasswordMailByEmailQuery,
    getDeleteResetPasswordMailByIdQuery,
} from '../../../app/helpers/sql';
import { getInsertResetPasswordMailQuery } from '../../../app/sql-queries';
import { values } from 'lodash';
import { getMockData, deleteMockData } from '../../../mock-data';

const chai = require('chai');
const expect = chai.expect;

const isOnly = false;
const desc = isOnly ? describe.only : describe;
const table = TABLES.RESET_PASSWORD_MAILS.NAME;
const cols = TABLES.RESET_PASSWORD_MAILS.COLUMNS;

desc('Services/users unit', () => {
    let data;

    before(async function () {
        data = await getMockData();
    });

    after(async () => {
        await deleteMockData(data);
    });

    describe('services / RESET-PASSWORD-MAILS', async () => {

        describe('updateExistingResetPasswordMails  (email)', async () => {
            it('should set status of all mails to unused by email', async function () {
                const users = values(data.notActivatedUsers);

                const allMails = await Promise.all(users.map(usr =>
                    insertResetPasswordMail({email:usr[cols.EMAIL]})
                ));

                await Promise.all(users.map(usr =>
                    updateExistingResetPasswordMails(usr[cols.EMAIL])
                ));

                const mails = await Promise.all(users.map(usr =>
                    oneOrNone(getSelectResetPasswordMailByEmailQuery(usr[cols.EMAIL]))
                ));

                expect(mails).to.not.be.empty;
                mails.forEach((res, i) => {
                    res.should.be.an('object');
                    const user = users[i];
                    const messageForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.STATUS]: RESET_PASSWORD_MAILS_STATUSES.UNUSED,
                    };
                    expect(res).to.deep.include(messageForComparison);
                });

                await Promise.all(allMails.map(mail =>
                    oneOrNone(getDeleteResetPasswordMailByIdQuery(mail.id))
                ));

            });
        });

        describe('setResetPasswordMailStatusToExpired  (id)', async () => {
            it('should set status of mail to expired by id', async function () {
                const users = values(data.notActivatedUsers);

                const allMails = await Promise.all(users.map(usr =>
                    insertResetPasswordMail({email:usr[cols.EMAIL]})
                ));

                await Promise.all(allMails.map(mail =>
                    setResetPasswordMailStatusToExpired(mail.id)
                ));

                const mails = await Promise.all(users.map(usr =>
                    oneOrNone(getSelectResetPasswordMailByEmailQuery(usr[cols.EMAIL]))
                ));

                expect(mails).to.not.be.empty;
                mails.forEach((res, i) => {
                    res.should.be.an('object');
                    const user = users[i];
                    const messageForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.STATUS]: RESET_PASSWORD_MAILS_STATUSES.EXPIRED,
                    };
                    expect(res).to.deep.include(messageForComparison);
                });

                await Promise.all(allMails.map(mail =>
                    oneOrNone(getDeleteResetPasswordMailByIdQuery(mail.id))
                ));

            });
        });

        describe('setResetPasswordMailStatusToUsed   (id)', async () => {
            it('should set status of mail to used by id', async function () {
                const users = values(data.notActivatedUsers);

                const allMails = await Promise.all(users.map(usr =>
                    oneOrNone(getInsertResetPasswordMailQuery({email: usr[cols.EMAIL]}))
                ));

                await Promise.all(allMails.map(mail =>
                    setResetPasswordMailStatusToUsed(mail.id)
                ));

                const mails = await Promise.all(users.map(usr =>
                    oneOrNone(getSelectResetPasswordMailByEmailQuery(usr[cols.EMAIL]))
                ));

                mails.forEach((res, i) => {
                    res.should.be.an('object');
                    const user = users[i];
                    const messageForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.STATUS]: RESET_PASSWORD_MAILS_STATUSES.USED,
                    };
                    expect(res).to.deep.include(messageForComparison);
                });

                await Promise.all(allMails.map(mail =>
                    oneOrNone(getDeleteResetPasswordMailByIdQuery(mail.id))
                ));

            });
        });

        describe('getResetPasswordMailByEmail   (email)', async () => {
            it('should return mails by email', async function () {
                const users = values(data.notActivatedUsers);

                const allMails = await Promise.all(users.map(usr =>
                    oneOrNone(getInsertResetPasswordMailQuery({email:usr[cols.EMAIL]}))
                ));

                await Promise.all(users.map(usr => {
                    getResetPasswordMailByEmail(usr.email);
                }));

                const mails = await Promise.all(users.map(usr =>
                    oneOrNone(getSelectResetPasswordMailByEmailQuery(usr[cols.EMAIL]))
                ));

                expect(mails).to.not.be.empty;
                mails.forEach((res, i) => {
                    res.should.be.an('object');
                    const user = users[i];
                    const messageForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.STATUS]: RESET_PASSWORD_MAILS_STATUSES.PENDING,
                    };
                    expect(res).to.deep.include(messageForComparison);
                });

                await Promise.all(allMails.map(mail =>
                    oneOrNone(getDeleteResetPasswordMailByIdQuery(mail.id))
                ));

            });
        });

        describe('getResetPasswordMailById   (id)', async () => {
            it('should return mail by id', async function () {
                const users = values(data.notActivatedUsers);

                const allMails = await Promise.all(users.map(usr =>
                    oneOrNone(getInsertResetPasswordMailQuery({email:usr[cols.EMAIL]}))
                ));

                const mails = await Promise.all(allMails.map(mail =>
                    getResetPasswordMailById(mail.id)
                ));

                expect(mails).to.not.be.empty;
                mails.forEach((res, i) => {
                    res.should.be.an('object');
                    const user = users[i];
                    const messageForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.STATUS]: RESET_PASSWORD_MAILS_STATUSES.PENDING,
                    };
                    expect(res).to.deep.include(messageForComparison);
                });

                await Promise.all(allMails.map(mail =>
                    oneOrNone(getDeleteResetPasswordMailByIdQuery(mail.id))
                ));
            });
        });

        describe('insertResetPasswordMail   (email)', async () => {
            it('should insert mail', async function () {
                const users = values(data.notActivatedUsers);

                const allMails = await Promise.all(users.map(usr =>
                    oneOrNone(getInsertResetPasswordMailQuery({email:usr[cols.EMAIL]}))
                ));

                expect(allMails).to.not.be.empty;
                allMails.forEach((res, i) => {
                    res.should.be.an('object');
                    const user = users[i];
                    const messageForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.STATUS]: RESET_PASSWORD_MAILS_STATUSES.PENDING,
                    };
                    expect(res).to.deep.include(messageForComparison);
                });

                await Promise.all(allMails.map(mail =>
                    oneOrNone(getDeleteResetPasswordMailByIdQuery(mail.id))
                ));
            });
        });
    });
});
