import { Router } from 'express';
import { ROUTES } from '../../constants/routes';
import * as post from './post';

const router = Router();

router.post(ROUTES.SESSION.LOG_IN, post.logIn);

export default router;
