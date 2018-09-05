export * from './session';
export * from './users';

import { isString } from 'lodash';

export function isValidUUID(uuid) {
    return isString(uuid) && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}

export function isValidEmail(email) {
    return isString(email) && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

export function isValidSignUpCode(code) {
    return isString(code) && /[\w]{40}$/.test(code);
}
