import { createAction } from 'redux-actions';
import ActionsTypes from './actionsTypes';

export const sendData = createAction(ActionsTypes.SEND_DATA);
