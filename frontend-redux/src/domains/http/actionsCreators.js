import { createAction } from 'redux-actions';
import ActionsTypes from './actionsTypes';

export const makeRequest = createAction(ActionsTypes.MAKE_REQUEST);

export const makeCancelableRequest = createAction(ActionsTypes.MAKE_CANCELABLE_REQUEST);
