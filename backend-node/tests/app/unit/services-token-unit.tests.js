import { TABLES } from '../../../app/constants';
import {getTokenForUser,
    decodeJWToken,
    getJWToken
} from '../../../app/services';
import { values } from 'lodash';
import { getMockData, deleteMockData } from '../../../mock-data';

const chai = require('chai');
const expect = chai.expect;

const isOnly = false;
const desc = isOnly ? describe.only : describe;
const table = TABLES.USERS.NAME;
const cols = TABLES.ACTIVATION_MAILS.COLUMNS;

desc('Services / ', () => {
    let data;

    before(async function () {
        data = await getMockData();
    });

    after(async () => {
        await deleteMockData(data);
    });

    describe('services / TOKEN', async () => {

        describe('getTokenForUser  (user, expiresIn)', async () => {
            it('should return generated token', async function () {
                const users = values(data.notActivatedUsers);

                const allTokens = await Promise.all(users.map(user =>
                    getTokenForUser({ [cols.EMAIL]: user[cols.EMAIL],
                        id: user.id })
                ));

                expect(allTokens).to.not.be.empty;
                allTokens.forEach(res => {
                    res.should.be.an('string');
                });

                const rawData = await getTokenForUser({
                    [cols.EMAIL]: 'testemail@gmail.com',
                    id: 'a40adf03-9f6f-4323-b0ad-12f2737fa917'
                });

                rawData.should.be.an('string');
            });
        });

        describe('decodeJWToken   (token)', async () => {
            it('should return data from token', async function () {
                const users = values(data.notActivatedUsers);

                const allTokens = await Promise.all(users.map(user => getTokenForUser(user)));

                const results = await Promise.all(allTokens.map(token =>
                    decodeJWToken(token)
                ));

                expect(results).to.not.be.empty;
                results.forEach(res => {
                    expect(res).to.have.all.keys('id', 'email', 'iat', 'exp');
                    res.id.should.be.an('string');
                    expect(res.id).to.not.be.empty;
                });
            });
        });

        describe('getJWToken  (data, expiresIn)', async () => {
            it('should return generated token', async function () {
                const users = values(data.notActivatedUsers);

                const results = await Promise.all(users.map(user =>
                    getJWToken({
                        [cols.EMAIL]: user[cols.EMAIL],
                        id: user.id,
                    })
                ));

                expect(results).to.not.be.empty;
                results.forEach(res => {
                    res.should.be.an('string');
                });
            });
        });
    });
});
