import dotenv from 'dotenv';

dotenv.config();

export const PRIVATE_SHA_512_KEY = '';
export const EMAIL = {
    HOST: process.env.MAIL_HOST,
    PORT: process.env.MAIL_PORT,
    ADDRESS: process.env.MAIL_ADDRESS,
    PASSWORD: process.env.MAIL_PASSWORD,
    AUTHOR: process.env.MAIL_AUTHOR,
};

export const TIMEOUTS = {
    ACTIVATION_TIMEOUT: process.env.ACTIVATION_EXPIRATION_INTERVAL,
    RESET_PASSWORD_TIMEOUT: process.env.RESET_PASSWORD_EXPIRATION_INTERVAL,
};

export const UI_URL = 'http://localhost:3000';
export const ACTIVATION_LINK = process.env.NODE_ENV === 'production' ? '': `${UI_URL}/activation/`;
export const RESET_PASSWORD_LINK = process.env.NODE_ENV === 'production' ? '': `${UI_URL}/reset/`;

export const MAILS_DATA = {
    HEADER: 'header',
    LINK: 'link',
    TEMPLATE: 'template',
};

export const DB_CONFIG = (()=> {
    switch (process.env.NODE_ENV) {
        case 'dev':
            return {
                host: process.env.DB_DEV_HOST,
                port: process.env.DB_DEV_PORT,
                database: process.env.DB_DEV_NAME,
                user: process.env.DB_DEV_USER,
                password: process.env.DB_DEV_PASS,
            };
        case 'test':
            return {
                host: process.env.DB_TEST_HOST,
                port: process.env.DB_TEST_PORT,
                database: process.env.DB_TEST_NAME,
                user: process.env.DB_TEST_USER,
                password: process.env.DB_TEST_PASS,
            };
    }
})();
