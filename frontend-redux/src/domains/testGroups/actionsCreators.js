import { RSAA } from 'redux-api-middleware';
import ActionTypes from './actionTypes';

export const loadTestGroups = () => ({
  [RSAA]: {
    endpoint: 'https://webilesoft-backend.herokuapp.com/groups',
    method: 'GET',
    types: [
      ActionTypes.LOAD_GROUPS_REQUEST,
      ActionTypes.LOAD_GROUPS_SUCCESS,
      ActionTypes.LOAD_GROUPS_FAILURE,
    ]
  }
});