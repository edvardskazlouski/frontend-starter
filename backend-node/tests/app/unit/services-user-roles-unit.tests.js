import { TABLES } from '../../../app/constants';
import { oneOrNone } from '../../../app/db';
import {getBusinessOwnerRoleId, getUserRoleById } from '../../../app/services';
import { getSelectUserRoleByIdQuery } from '../../../app/sql-queries';

import { getMockData,
        deleteMockData
} from '../../../mock-data';

const chai = require('chai');
const expect = chai.expect;

const isOnly = false;
const desc = isOnly ? describe.only : describe;
const table = TABLES.USER_ROLES;
const cols = table.COLUMNS;
const colsCompany = TABLES.COMPANIES_USERS_ROLES.COLUMNS;

desc('Services/users unit', () => {
    let data;

    before(async function() {
        this.timeout(5000);
        data = await getMockData();
    });

    after(async () => {
        await deleteMockData(data);
    });

    describe('services / ', async () => {

        describe('getUserRoleById    (id)', async () => {
            it('should return role by id', async function(){
                const companiesUserRoles = data.companyUserRoles;

                const results = await Promise.all(companiesUserRoles.map(company =>
                    getUserRoleById(company.role_id)
                ));

                expect(results).to.not.be.empty;
                results.forEach((res, i) => {
                    res.should.be.an('object');
                    const company = companiesUserRoles[i];
                    const messageForComparison = {
                        id: company[colsCompany.ROLE_ID],
                        [cols.ROLE]: 'business-owner'
                    };
                    expect(res).to.deep.include(messageForComparison);
                });
            });
        });

        describe('getBusinessOwnerRoleId    ()', async () => {
            it('should return buisness-owner role id', async function(){
                const businessOwnerRole = await getBusinessOwnerRoleId();

                const result = await oneOrNone(getSelectUserRoleByIdQuery(businessOwnerRole.id));

                expect(result).to.not.be.empty;
                result.should.be.an('object');
                const messageForComparison = {
                    [cols.ROLE]: 'business-owner'
                };
                expect(result).to.deep.include(messageForComparison);
            });
        });
    });
});
