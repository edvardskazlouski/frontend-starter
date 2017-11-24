import { createAction } from 'redux-actions';
import ActionTypes from 'actionTypes/modals';
import ModalTypes from 'constants/modals';

export const openModal = createAction(ActionTypes.OPEN);

export const closeModal = createAction(ActionTypes.CLOSE);

export const openTestModal = () => openModal({ type:  ModalTypes.TEST_MODAL });