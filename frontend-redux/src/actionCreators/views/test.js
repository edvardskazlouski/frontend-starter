import { createAction } from 'redux-actions';
import ActionTypes from 'actionTypes/views/test';

export const cancelRequest = createAction(ActionTypes.CANCEL_ADD_TEST_REQUEST);

export const addTest = () => {
  return {
    ACTIONS: {
      start: createAction(ActionTypes.ADD_TEST_REQUEST),
      success: createAction(ActionTypes.ADD_TEST_SUCCESS),
      error: createAction(ActionTypes.ADD_TEST_FAILURE),
      cancel: createAction(ActionTypes.ADD_TEST_CANCELED),
    },
    url: '/test',
    config: {
      method: 'POST',
      body: JSON.stringify({}),
      cancelActionType: ActionTypes.CANCEL_ADD_TEST_REQUEST,
    },
  };
};


export const setTest = createAction(ActionTypes.SET_TEST);

export const submitValue = createAction(ActionTypes.SUBMIT_VALUE);
