import app from '../../../../app/app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { ROUTES, TABLES, ERROR_MESSAGES } from '../../../../app/constants';
import { getMockData } from '../../../../mock-data';
import {deleteMockData} from '../../../../mock-data';

chai.use(chaiHttp);
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const isOnly = false;
const desc = isOnly ? describe.only : describe;
const table = TABLES.USERS.NAME;
const userCols = TABLES.USERS.COLUMNS;
const errors = ERROR_MESSAGES.AUTH;
const ValidationErrors = ERROR_MESSAGES.VALIDATION;
const ProfileErrors = ERROR_MESSAGES.PROFILE;

desc.skip('Profile API', () => {
    let data;

    before(async function () {
        data = await getMockData();
    });

    after(async () => {
        await deleteMockData(data);
    });

    describe('DELETE /profile', async () => {

        //  TODO: Rewrite delete endpoints then add tests

    });
});
