import ActionTypes from './actionTypes';
import { formatGroups } from './formatters';
import { createAction } from 'redux-actions';
import { ENDPOINTS } from 'domains/http/constants';

const APP_URL = 'https://webilesoft-backend.herokuapp.com';

export const loadTestGroups = () => ({
  ACTIONS: {
    start: createAction(ActionTypes.LOAD_GROUPS_REQUEST),
    success: {
      type: ActionTypes.LOAD_GROUPS_SUCCESS,
      payload: (action, state, res) =>  {
        console.log('test');
        console.log(action);
        console.log(state);
        console.log(res);
      }//res.json().then(data => formatGroups(data.groups))
    },
    error: createAction(ActionTypes.LOAD_GROUPS_FAILURE),
    cancel: createAction(ActionTypes.LOAD_GROUPS_CANCELED),
  },
  url: `${APP_URL}${ENDPOINTS.GROUPS}`,
  config: {
    method: 'GET',
  },
});
