import { createAction } from 'redux-actions';
import ActionTypes from 'actionTypes/views/test';
import { API_URL, ENDPOINTS } from 'domains/http/constants';

export const cancelRequest = createAction(ActionTypes.CANCEL_ADD_TEST_REQUEST);

export const addTest = (data) => ({
  ACTIONS: {
    start: createAction(ActionTypes.ADD_TEST_REQUEST),
    success: createAction(ActionTypes.ADD_TEST_SUCCESS),
    error: createAction(ActionTypes.ADD_TEST_FAILURE),
    cancel: createAction(ActionTypes.ADD_TEST_CANCELED)
  },
  url: `${API_URL}${ENDPOINTS.TEST}`,
  config: {
    method: 'POST',
    body: JSON.stringify({data}),
    cancelActionTypes: [ActionTypes.CANCEL_ADD_TEST_REQUEST],
  },
});

export const initiateRequest = createAction(ActionTypes.INIT_TEST_REQUEST);

export const setTest = createAction(ActionTypes.SET_TEST);

export const submitValue = createAction(ActionTypes.SUBMIT_VALUE);

export const addFirebaseData = createAction(ActionTypes.ADD_FIREBASE_DATA_TEST);
