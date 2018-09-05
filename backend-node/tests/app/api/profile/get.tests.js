import app from '../../../../app/app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { createRoute } from '../../../../helpers';
import { ROUTES, TABLES, ERROR_MESSAGES } from '../../../../app/constants';
import { getTokenForUser } from '../../../../app/services';
import { values } from 'lodash';
import { getMockData, deleteMockData } from '../../../../mock-data';

chai.use(chaiHttp);
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const isOnly = false;
const desc = isOnly ? describe.only : describe;
const table = TABLES.USERS.NAME;
const cols = TABLES.USERS.COLUMNS;
const errors = ERROR_MESSAGES.AUTH;

desc('Profile API', () => {
    let data;

    before(async function() {
        data = await getMockData();
    });

    after(async () => {
        await deleteMockData(data);
    });

    describe('GET /PROFILE', async () => {

        describe('/GET', async () => {

            it('should return all profiles one for each token', async function() {
                this.timeout(7000);
                const users = values(data.activatedUsers);

                const tokens = await Promise.all(users.map(user => getTokenForUser(user)));

                const responses = await Promise.all(tokens.map(token => chai.request(app)
                    .get(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.GET))
                    .set({'x-access-token': token})));

                responses.forEach((response, i) => {
                    const user = users[i];
                    const userForComparison = {
                        [cols.FIRST_NAME]: user[cols.FIRST_NAME],
                        [cols.LAST_NAME]: user[cols.LAST_NAME],
                        [cols.EMAIL]: user[cols.EMAIL],
                        [cols.IS_ACTIVE]: user[cols.IS_ACTIVE]
                    };

                    response.status.should.equal(200);
                    response.body.should.have.property('success');
                    response.body.success.should.equal(true);
                    response.body.should.have.property('user');
                    response.body.user.should.deep.equal(userForComparison);
                });
            });

            it(`should return ${errors.AUTHORIZATION_ERROR.code} error if broken token is provided`, async () => {
                const users = values(data.activatedUsers);
                const tokens = await Promise.all(users.map(user => getTokenForUser(user)));

                const responses = await Promise.all(tokens.map(token => chai.request(app)
                    .get(createRoute(ROUTES.PROFILE.BASE, ROUTES.PROFILE.GET))
                    .set({'x-access-token': token.slice(1)})
                ));

                responses.forEach(response => {
                    response.should.have.property('status');
                    response.status.should.equal(400);
                    response.body.should.deep.equal({
                        success: false,
                        error: errors.AUTHORIZATION_ERROR,
                    });
                });
            });
        });
    });
});
