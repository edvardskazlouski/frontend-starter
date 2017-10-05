import { RSAA } from 'redux-api-middleware';
import ActionTypes from './actionTypes';
import { formatGroups } from './formatters';

export const loadTestGroups = () => ({
  [RSAA]: {
    endpoint: 'https://webilesoft-backend.herokuapp.com/groups',
    method: 'GET',
    types: [
      ActionTypes.LOAD_GROUPS_REQUEST,
      {
        type: ActionTypes.LOAD_GROUPS_SUCCESS,
        payload: (action, state, res) => res.json().then(data => formatGroups(data.groups))
      },
      ActionTypes.LOAD_GROUPS_FAILURE,
    ]
  }
});