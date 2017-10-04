import { put, take } from 'redux-saga/effects';

// action types
import ActionTypes from './actionTypes';

import * as ActionCreators from './actionsCreators';

export default function* testGroupsSaga() {
  yield put(ActionCreators.loadTestGroups());

  yield take([
    ActionTypes.LOAD_GROUPS_SUCCESS,
    ActionTypes.LOAD_GROUPS_FAILURE,
  ]);
}