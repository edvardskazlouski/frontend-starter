import { TABLES } from '../../../app/constants';
import { oneOrNone } from '../../../app/db';
import { updateExistingActivationMails,
        setActivationMailStatusToExpired,
        setActivationMailStatusToUsed,
        getActivationMail,
        insertActivationMail
} from '../../../app/services';
import {getSelectActivationMailByEmailQuery,
    getSetActivationMailPendingByIdQuery,
    getDeleteActivationMailByEmailQuery } from '../../../app/helpers/sql';
import { values } from 'lodash';
import { getMockData, deleteMockData } from '../../../mock-data';

const chai = require('chai');
const expect = chai.expect;

const isOnly = false;
const desc = isOnly ? describe.only : describe;
const table = TABLES.USERS.NAME;
const cols = TABLES.ACTIVATION_MAILS.COLUMNS;

desc('Services/users unit', () => {
    let data;

    before(async function () {
        data = await getMockData();
    });

    after(async () => {
        await deleteMockData(data);
    });

    describe('services ACTIVATION-MAILS', async () => {

        describe('updateExistingActivationMails  (email)', async () => {
            it('should set status of all mails to unused', async function () {
                const users = values(data.notActivatedUsers);

                await Promise.all(users.map(user =>
                    updateExistingActivationMails(user[cols.EMAIL])
                ));

                const mails = await Promise.all(users.map(user =>
                    oneOrNone(getSelectActivationMailByEmailQuery(user[cols.EMAIL]))
                ));

                expect(mails).to.not.be.empty;
                mails.forEach((mail, i) => {
                    const user = users[i];
                    const messageForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.STATUS]: 'UNUSED',
                    };
                    mail.should.be.an('object');
                    expect(mail).to.deep.include(messageForComparison);
                });

                await Promise.all(mails.map(mail =>
                    oneOrNone(getSetActivationMailPendingByIdQuery(mail.id))
                ));
            });
        });

        describe('setActivationMailStatusToExpired   (id)', async () => {
            it('should set status of mail to expired', async function () {
                const users = values(data.notActivatedUsers);

                const allMails = await Promise.all(users.map(user =>
                    oneOrNone(getSelectActivationMailByEmailQuery(user[cols.EMAIL]))
                ));

                await Promise.all(allMails.map(mail =>
                    setActivationMailStatusToExpired(mail.id)
                ));

                const mails = await Promise.all(users.map(user =>
                    oneOrNone(getSelectActivationMailByEmailQuery(user[cols.EMAIL]))
                ));

                expect(mails).to.not.be.empty;
                mails.forEach((mail, i) => {
                    const user = users[i];
                    const messageForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.STATUS]: 'EXPIRED',
                    };
                    mail.should.be.an('object');
                    expect(mail).to.deep.include(messageForComparison);
                });

                await Promise.all(mails.map(mail =>
                    oneOrNone(getSetActivationMailPendingByIdQuery(mail.id))
                ));
            });
        });

        describe('setActivationMailStatusToUsed   (id)', async () => {
            it('should set status of mail to used', async function () {
                const users = values(data.notActivatedUsers);

                const allMails = await Promise.all(users.map(user =>
                    oneOrNone(getSelectActivationMailByEmailQuery(user[cols.EMAIL]))
                ));

                await Promise.all(allMails.map(mail =>
                    setActivationMailStatusToUsed (mail.id)
                ));

                const mails = await Promise.all(users.map(user =>
                    oneOrNone(getSelectActivationMailByEmailQuery(user[cols.EMAIL]))
                ));

                expect(mails).to.not.be.empty;
                mails.forEach((mail, i) => {
                    const user = users[i];
                    const messageForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.STATUS]: 'USED',
                    };
                    mail.should.be.an('object');
                    expect(mail).to.deep.include(messageForComparison);
                });

                await Promise.all(mails.map(mail =>
                    oneOrNone(getSetActivationMailPendingByIdQuery(mail.id))
                ));
            });
        });

        describe('getActivationMail   (id)', async () => {
            it('should return activation mail by id', async function () {
                const users = values(data.notActivatedUsers);

                const allMails = await Promise.all(users.map(user =>
                    oneOrNone(getSelectActivationMailByEmailQuery(user[cols.EMAIL]))
                ));

                const mails = await Promise.all(allMails.map(mail =>
                    getActivationMail(mail.id)
                ));

                expect(mails).to.not.be.empty;
                mails.forEach((mail, i) => {
                    const user = users[i];
                    const messageForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.STATUS]: 'PENDING',
                    };
                    mail.should.be.an('object');
                    expect(mail).to.deep.include(messageForComparison);
                });
            });
        });

        describe('insertActivationMail   (email)', async () => {
            it('should insert activation mail', async function () {
                const users = values(data.notActivatedUsers);

                await Promise.all(users.map(user =>
                    oneOrNone(getDeleteActivationMailByEmailQuery(user[cols.EMAIL]))
                ));

                await Promise.all(users.map(user =>
                    insertActivationMail({ email: user.email })
                ));

                const mails = await Promise.all(users.map(user =>
                    oneOrNone(getSelectActivationMailByEmailQuery(user.email))
                ));

                expect(mails).to.not.be.empty;
                mails.forEach((mail, i) => {
                    const user = users[i];
                    const messageForComparison = {
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.STATUS]: 'PENDING',
                    };
                    mail.should.be.an('object');
                    expect(mail).to.deep.include(messageForComparison);
                });
            });
        });
    });
});
