import { put, take } from 'redux-saga/effects';
import * as HttpActionCreators from 'domains/http/actionsCreators';

// action types
import ActionTypes from './actionTypes';

import * as ActionCreators from './actionsCreators';

export default function* testGroupsSaga() {
  yield put(HttpActionCreators.makeRequest(ActionCreators.loadTestGroups()));

  yield take([
    ActionTypes.LOAD_GROUPS_SUCCESS,
    ActionTypes.LOAD_GROUPS_FAILURE,
    ActionTypes.LOAD_GROUPS_CANCELED,
  ]);
}
