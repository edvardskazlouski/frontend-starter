import jwt from 'jsonwebtoken';
const JWTSecret = 'f4vb8FJu9hE9XeasszY5awQU/E2OEZ';
const expirationPeriod = '30d';

export function getJWToken(data, expiresIn = expirationPeriod) {
    return new Promise((resolve, reject) =>
        jwt.sign(
            data,
            JWTSecret,
            { expiresIn },
            (err, token) => {
                if (err) {reject(err);}
                else {resolve(token);}
            },
        )
    );
}

export function decodeJWToken(token) {
    return new Promise((resolve, reject) =>
        jwt.verify(
            token,
            JWTSecret,
            (err, decoded) => {
                if (err) {reject(err);}
                else {resolve(decoded);}
            },
        )
    );
}

export function getTokenForUser(user, expiresIn = expirationPeriod) {
    return getJWToken({ email: user.email, id: user.id }, expiresIn);
}
