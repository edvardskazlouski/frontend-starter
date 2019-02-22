import { createAction } from 'redux-actions';
import ActionTypes from 'actionTypes/loading';

export const startLoading = createAction(ActionTypes.LOADING_START);

export const stopLoading = createAction(ActionTypes.LOADING_FINISH);
