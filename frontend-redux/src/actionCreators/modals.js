import ActionTypes from 'actionTypes/modals';
import ModalTypes from 'constants/modals';

export const openModal = payload => ({
  type: ActionTypes.OPEN,
  payload
});

export const closeModal = () => ({
  type: ActionTypes.CLOSE,
});

export const openTestModal = () => openModal({ type:  ModalTypes.TEST_MODAL });
