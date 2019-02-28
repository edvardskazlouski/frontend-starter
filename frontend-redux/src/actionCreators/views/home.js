import { RSAA } from 'redux-api-middleware';
import { createAction } from 'redux-actions';

export const startHomeRequest = createAction('START_HOME_REQUEST');

export const finishHomeRequest = createAction('FINISH');

export const cancelRequest = createAction('CANCEL_REQUEST');

export const homeRequest = () => ({
  [RSAA]: {
    endpoint: '/test',
    method: 'GET',
    types: [
      'HOME_REQUEST',
      'HOME_SUCCESS',
      'HOME_FAILURE',
    ]
  }
});
