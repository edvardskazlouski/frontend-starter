import { keys } from 'lodash';

export function createRoute(base, route = '', params = {}) {
    if (!base) {
        throw new Error('createRoute base must be passed');
    }

    let result = route;

    keys(params).forEach((param) => {
        result = result.replace(`:${param}`, params[param]);
    });

    return base + result;
}
