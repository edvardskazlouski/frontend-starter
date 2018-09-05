import chai from 'chai';
import {
    fillDataBaseWithMockData,
    removeMockDataFromDataBase,
    checkDataWasRemoved,
    dataAmounts
} from '../../mock-data/index';
import { keys } from 'lodash';

const should = chai.should();
const assert = chai.assert;

const isOnly = false;
const desc = isOnly ? describe.only : describe;

desc('Mock Data filling DB', () => {

    describe('fillAndClearDataBaseWithMockData', () => {
        let data;
        it('should add mock data to database', async function () {
            this.timeout(7000);

            data = await fillDataBaseWithMockData();

            keys(dataAmounts).forEach(key => {
                should.equal(data[key].length, dataAmounts[key]);
            });
        });

        it('should remove all mock data from database', async function () {
            this.timeout(7000);
            should.equal(await removeMockDataFromDataBase(data), true);

            should.equal(await checkDataWasRemoved(data), true);
        });
    });
});
