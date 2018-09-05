import pgPromise from 'pg-promise';
import { DB_CONFIG } from '../constants';

const pgp = pgPromise();
const db = pgp(DB_CONFIG);

export function many(query) {
    return db.many(query);
}

export function one(query) {
    return db.one(query);
}

export function none(query) {
    return db.none(query);
}

export function oneOrNone(query) {
    return db.oneOrNone(query);
}

export function manyOrNone(query) {
    return db.manyOrNone(query);
}

export function any(query) {
    return db.manyOrNone(query);
}
