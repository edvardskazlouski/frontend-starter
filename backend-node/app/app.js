import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './helpers/logger';

import api from './api';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(cors());

app.use('/', api);

app.use((err, req, res, next) => {
    if (err) {
        logger.error(err.name + ': ' + err.message);
        res.status(500).send(err.message);
    } else {
        next(req, res);
    }
});

export default app;
