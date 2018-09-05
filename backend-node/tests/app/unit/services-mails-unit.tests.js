import { TABLES, MAILS_DATA } from '../../../app/constants';
import { oneOrNone, manyOrNone } from '../../../app/db';
import { EMAIL, ACTIVATION_LINK } from '../../../app/constants';
import path from 'path';
import { sendActivationMail,
    sendResetPasswordMail,
    renderTemplateAndSendMail,
    renderMailTemplate,
    sendMail
} from '../../../app/services/mail';
import {
    getSelectPendingActivationMailByEmailQuery,
    getSelectActivationMailByEmailQuery,
    getDeleteResetPasswordMailByEmailQuery,
    getDeleteActivationMailByIdQuery} from '../../../app/helpers/sql';
import { values } from 'lodash';
import { getMockData, deleteMockData } from '../../../mock-data';

const chai = require('chai');
const expect = chai.expect;

const isOnly = false;
const desc = isOnly ? describe.only : describe;
const cols = TABLES.USERS.COLUMNS;

desc('Services/users unit', () => {
    let data;

    before(async function() {
        this.timeout(5000);
        data = await getMockData();
    });

    after(async () => {
        await deleteMockData(data);
    });

    describe('services / MAILS', async () => {

        describe('sendActivationMail (email)', async () => {
            it('shuld send activation mail', async function() {
                this.timeout(15000);
                const users = values(data.notActivatedUsers);

                const defaultMails = await Promise.all(users.map(user =>
                    oneOrNone(getSelectPendingActivationMailByEmailQuery(user[cols.EMAIL]))
                ));

                await Promise.all(defaultMails.map(mail =>
                    oneOrNone(getDeleteActivationMailByIdQuery(mail.id))
                ));

                const results = await Promise.all(users.map(user =>
                    sendActivationMail(user[cols.EMAIL])
                ));

                if (process.env.NODE_ENV === 'dev'){
                    expect(results).to.not.be.empty;
                    results.forEach((res, i) => {
                        res.should.be.an('object');
                        const user = users[i];
                        const resultForComparison = {
                            'envelope': {
                                'from': `${EMAIL.ADDRESS}`,
                                'to': [user[cols.EMAIL]]
                            },
                            'rejected': [],
                            'accepted': [user[cols.EMAIL]],
                        };
                        expect(res).to.deep.include(resultForComparison);
                    });
                }
            });
        });

        describe('sendResetPasswordMail (email)', async () => {
            it('shuld send reset mail', async function() {
                this.timeout(7000);
                const users = values(data.activatedUsers);

                const results = await Promise.all(users.map(user =>
                    sendResetPasswordMail(user.email)
                ));

                if (process.env.NODE_ENV === 'dev') {
                    expect(results).to.not.be.empty;
                    results.forEach((res, i) => {
                        const user = users[i];
                        const userForComparison = {
                            'envelope': {
                                'from': `${EMAIL.ADDRESS}`,
                                'to': [user[cols.EMAIL]]
                            },
                            'rejected': [],
                            'accepted': [user[cols.EMAIL]],
                        };
                        res.should.be.an('object');
                        expect(res).to.deep.include(userForComparison);
                    });
                }

                await Promise.all(users.map(mail =>
                    manyOrNone(getDeleteResetPasswordMailByEmailQuery(mail.email))
                ));
            });
        });

        describe('renderTemplateAndSendMail (mail)', async () => {
            it('shuld send activation(default) mail', async function() {
                this.timeout(7000);
                const users = values(data.notActivatedUsers);

                const mails = await Promise.all(users.map(user =>
                    oneOrNone(getSelectPendingActivationMailByEmailQuery(user[cols.EMAIL]))
                ));

                const results = await Promise.all(mails.map(mail =>
                    renderTemplateAndSendMail(mail, {
                        [MAILS_DATA.HEADER]: 'Registration',
                        [MAILS_DATA.LINK]: ACTIVATION_LINK,
                        [MAILS_DATA.TEMPLATE]: '../templates/sign-up.ejs',
                    })
                ));

                expect(results).to.not.be.empty;
                results.forEach((res, i) => {
                    const user = users[i];
                    const userForComparison = {
                        'envelope': {
                            'from': `${EMAIL.ADDRESS}`,
                            'to': [user[cols.EMAIL]]
                        },
                        'rejected': [],
                        'accepted': [user[cols.EMAIL]],
                    };
                    res.should.be.an('object');
                    expect(res).to.deep.include(userForComparison);
                });
            });
        });

        describe('sendMail  (to, subject, html)', async () => {
            it('shuld send already maked template', async function() {
                this.timeout(7000);
                const users = values(data.notActivatedUsers);

                const mails = await Promise.all(users.map(user =>
                    oneOrNone(getSelectActivationMailByEmailQuery(user[cols.EMAIL]))
                ));

                const filename = path.resolve(process.cwd(), '../mba-backend/app/templates/sign-up.ejs');
                const templates = await Promise.all(mails.map(mail => {
                    const link = `${ACTIVATION_LINK}${mail.id}`;
                    return renderMailTemplate(filename, {link}, {});
                }));

                const results = await Promise.all(mails.map((mail,i) => {
                    const header = 'test';
                    return sendMail(mail.email, header, templates[i]);
                }));

                expect(results).to.not.be.empty;
                results.forEach((res, i) => {
                    const user = users[i];
                    const messageForComparison = {
                        'envelope': {
                            'from': `${EMAIL.ADDRESS}`,
                            'to': [user[cols.EMAIL]]
                        },
                        'rejected': [],
                        'accepted': [user[cols.EMAIL]],
                    };
                    res.should.be.an('object');
                    expect(res).to.deep.include(messageForComparison);
                });
            });
        });
    });
});
