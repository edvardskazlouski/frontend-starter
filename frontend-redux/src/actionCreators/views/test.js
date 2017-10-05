import ActionTypes from 'actionTypes/views/test';

export const setTest = () => ({
  type: ActionTypes.SET_TEST,
});

export const submitValue = payload => ({
  type: ActionTypes.SUBMIT_VALUE,
  payload
});
