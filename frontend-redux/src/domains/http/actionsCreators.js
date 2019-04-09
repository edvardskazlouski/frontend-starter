import { createAction } from 'redux-actions';
import ActionsTypes from './actionsTypes';

export const startRequest = createAction(ActionsTypes.START_REQUEST);

export const progressRequest = createAction(ActionsTypes.PROGRESS_REQUEST);

export const finishRequest = createAction(ActionsTypes.FINISH_REQUEST);

export const makeRequest = createAction(ActionsTypes.MAKE_REQUEST);
