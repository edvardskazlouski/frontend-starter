import { createAction } from 'redux-actions';
import { Map } from 'immutable';
import ActionTypes from 'actionTypes/modals';
import ModalTypes from 'constants/modals';

export const openModal = createAction(ActionTypes.OPEN);

export const closeModal = createAction(ActionTypes.CLOSE);

export const openTestModal = (options = new Map()) => openModal({ type:  ModalTypes.TEST_MODAL, options });

export const openForgotPasswordModal = () => openModal({ type:  ModalTypes.FORGOT_PASSWORD });
