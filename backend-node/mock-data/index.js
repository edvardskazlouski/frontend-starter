import values from 'lodash/values';
import keys from 'lodash/keys';
import * as DataGenerators from './data-generators';
import * as DataFillers from './data-fillers';
import * as DataRemovers from './data-removers';
import * as DataCheckers from './data-checkers';
import { getTokenForUser } from '../app/services';

export const dataAmounts = {
    //  configurable
    rawUsers: 2,
    //  takenFromDataBase
    //  manyToManyRelationCalculated
};

export async function fillDataBaseWithMockData() {
    try {
        const rawUsers = DataGenerators.getUsers(dataAmounts.rawUsers, '-raw-');

        const rawNotActivatedUsers = DataGenerators.getUsers(dataAmounts.companies, '-notActivated-');
        const rawActivatedUsers = DataGenerators.getUsers(dataAmounts.companies, '-activated-', true);

        //  keep array values in alphabetical order
        const [notActivatedUsers, activatedUsers] = await Promise.all([
            DataFillers.fillUsers(rawNotActivatedUsers),
            DataFillers.fillUsers(rawActivatedUsers),
        ]);

        return {
            rawUsers,
            notActivatedUsers,
            activatedUsers,
        };
    } catch (error) {
        return false;
    }
}

export async function removeMockDataFromDataBase(data = {}) {
    try {
        const totalUsers = [...values(data.notActivatedUsers), ...values(data.activatedUsers)];
        const allEmails = totalUsers.map(user => user.email);

        const allCompaniesIds = data.companies.map(company => company.id);

        const allFactoriesIds = data.factories.map(factory => factory.id);

        const allPlacesIds = data.places.map(place => place.id);

        // ------------------------KEEP ORDER!
        await Promise.all([
            DataRemovers.deleteResetPasswordMailsByEmailsQuery(allEmails),
            DataRemovers.deleteActivationMailsByEmailsQuery(allEmails),
        ]);

        await DataRemovers.deleteUsersByEmailsQuery(allEmails);

        return true;
    } catch (error) {
        return false;
    }
}

export async function checkDataWasRemoved(data = {}) {
    try {
        const totalUsers = [...values(data.notActivatedUsers), ...values(data.activatedUsers)];
        const allEmails = totalUsers.map(user => user.email);

        await Promise.all([
            DataCheckers.checkUsers(allEmails),
        ]);
        return true;
    } catch (error) {
        return false;
    }
}

export async function deleteMockData(data = {}) {
    await removeMockDataFromDataBase(data);
    global.data = null;
}

export async function getMockData() {
    const data = await fillDataBaseWithMockData();

    data.accessTokens = await Promise.all(keys(data.activatedUsers).map((id) => {
        const user = data.activatedUsers[id];
        return getTokenForUser({
            id: id,
            email: user.email,
        });
    }));

    return data;
}
