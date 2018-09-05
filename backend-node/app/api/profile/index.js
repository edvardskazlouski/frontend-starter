import express from 'express';

import { ROUTES } from '../../constants';

import * as post from './post';
import * as get from './get';
import * as remove from './delete';
import * as put from './put';

const router = express.Router();

router.get(ROUTES.PROFILE.GET, get.getProfile);

router.post(ROUTES.PROFILE.CREATE, post.createProfile);
router.post(ROUTES.PROFILE.ACTIVATE, post.activateUser);
router.post(ROUTES.PROFILE.RESEND_ACTIVATION, post.resendActivationMail);
router.post(ROUTES.PROFILE.SEND_RESET_PASSWORD_MAIL, post.sendResetPasswordMail);

router.put(ROUTES.PROFILE.RESET_PASSWORD, put.resetPassword);
router.put(ROUTES.PROFILE.UPDATE_PASSWORD, put.updatePassword);

router.delete(ROUTES.PROFILE.DELETE, remove.deleteProfile);

router.post(ROUTES.PROFILE.ACTIVATION_BACKDOOR, post.activationBackdoor);

export default router;
