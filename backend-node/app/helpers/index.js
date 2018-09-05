import { ACTIVATION_EXPIRATION_INTERVAL, RESET_PASSWORD_EXPIRATION_INTERVAL } from '../constants';

export function isExpriredActivationDate(date, now) {
    return now > date + ACTIVATION_EXPIRATION_INTERVAL;
}

export function isExpriredResetPasswordDate(date, now) {
    return now > date + RESET_PASSWORD_EXPIRATION_INTERVAL;
}
