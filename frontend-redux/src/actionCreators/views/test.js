import { createAction } from 'redux-actions';
import ActionTypes from 'actionTypes/views/test';

export const setTest = createAction(ActionTypes.SET_TEST);

export const submitValue = createAction(ActionTypes.SUBMIT_VALUE);
