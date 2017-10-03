import { put, take } from 'redux-saga/effects';

// actions creators
import { ActionCreators as TestGroupsActionCreators } from '../../domains/testGroups';
import * as TestViewActionCreators from '../../actionCreators/test';

// action types
import { ActionTypes as TestGroupsActionTypes } from '../../domains/testGroups';

export default function* testSage() {
  yield put(TestGroupsActionCreators.loadTestGroups());

  const action = yield take([
    TestGroupsActionTypes.LOAD_GROUPS_SUCCESS,
    TestGroupsActionTypes.LOAD_GROUPS_FAILURE,
  ]);

  if(action.type === TestGroupsActionTypes.LOAD_GROUPS_SUCCESS) {
    yield put(TestViewActionCreators.setTest());
  }
}
