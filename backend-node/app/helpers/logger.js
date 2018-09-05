import dotenv from 'dotenv';
import { LOG_LEVELS } from '../constants/index';
import { isString } from 'lodash';

dotenv.config();

function formatMessage(message) {
    return `${(new Date()).toTimeString()}: ${isString(message) ? message : JSON.stringify(message)}`;
}

function logger(message, level) {
    if(process.env.LOG_LEVEL < level) {
        return;
    }

    switch(level) {
        case LOG_LEVELS.INFO:
            console.info(formatMessage(message));
            break;
        case LOG_LEVELS.DEBUG:
            console.log(formatMessage(message));
            break;
        case LOG_LEVELS.WARN:
            console.warn(formatMessage(message));
            break;
        case LOG_LEVELS.ERROR:
            console.error(formatMessage(message));
            break;
    }
}

export default {
    debug (message) {
        logger(message, LOG_LEVELS.DEBUG);
    },

    info (message) {
        logger(message, LOG_LEVELS.INFO);
    },

    warn (message) {
        logger(message, LOG_LEVELS.WARN);
    },

    error (message) {
        logger(message, LOG_LEVELS.ERROR);
    },
};
