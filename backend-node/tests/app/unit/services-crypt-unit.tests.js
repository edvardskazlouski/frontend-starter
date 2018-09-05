import {encryptPassword} from '../../../app/services';
import { TABLES } from '../../../app/constants';
import { values } from 'lodash';
import { getMockData, deleteMockData } from '../../../mock-data';

const chai = require('chai');
const expect = chai.expect;

const isOnly = false;
const desc = isOnly ? describe.only : describe;
const table = TABLES.USERS;
const cols = table.COLUMNS;

desc('Services unit-testing', () => {
    let data;

    before(async function() {
        this.timeout(5000);
        data = await getMockData();
    });

    after(async () => {
        await deleteMockData(data);
    });

    describe('services / CRYPT', async () => {

        describe('encryptPassword    (password, key)', async () => {
            it('should return generated salt and hash', async function(){
                this.timeout(5000);
                const users = values(data.activatedUsers);

                const encryptedPasswords = await Promise.all(users.map(usr =>
                    encryptPassword(usr.rawPassword, usr.key)
                ));

                expect(encryptedPasswords).to.not.be.empty;
                encryptedPasswords.forEach((res, i) => {
                    const user = users[i];
                    const messageForComparison = {
                        encryptedPassword: user[cols.PASSWORD],
                        salt: user[cols.KEY]
                    };
                    res.should.be.an('object');
                    expect(res).to.deep.include(messageForComparison);
                });
            });
        });
    });
});
