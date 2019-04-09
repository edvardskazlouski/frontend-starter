import { all, takeEvery, put, take } from 'redux-saga/effects';
import TestActionTypes from 'actionTypes/views/test';
import * as HTTPActionCreator from 'domains/http/actionsCreators';
import { addTest } from '../../actionCreators/views/test';
import HTTPActionTypes from 'domains/http/actionsTypes';


function* initRequestWatcher() {
  yield takeEvery(TestActionTypes.INIT_TEST_REQUEST, initRequestWorker);
}

function* initRequestWorker({payload}) {
  yield put(HTTPActionCreator.makeRequest(addTest(payload)));
  yield take(HTTPActionTypes.FINISH_REQUEST);
}



export default function* testSaga() {
  yield all([initRequestWatcher()]);
}
