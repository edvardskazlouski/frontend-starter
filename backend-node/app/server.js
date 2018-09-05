import app from './app';
import logger from './helpers/logger';

const port = process.env.PORT || 3010;
app.listen(port, () => {
    logger.info(`Application server started at http://localhost:${port}`);
});
