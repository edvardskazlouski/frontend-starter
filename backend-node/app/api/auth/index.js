import { Router } from 'express';
import { isAuthorized, isActivated } from './auth';

const router = Router();

router.use('/*', isAuthorized);
router.use('/*', isActivated);

export default router;
