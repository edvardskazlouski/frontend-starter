import { all, takeEvery, put, take } from 'redux-saga/effects';
import TestActionTypes from 'actionTypes/views/test';
import * as HTTPActionCreator from 'domains/http/actionsCreators';
import { addTest } from '../../actionCreators/views/test';
import HTTPActionTypes from 'domains/http/actionsTypes';
import * as FirebaseActionCreators from 'domains/firebase/actionsCreators';


function* initRequestWatcher() {
  yield takeEvery(TestActionTypes.INIT_TEST_REQUEST, initRequestWorker);
}

function* initRequestWorker({payload}) {
  yield put(HTTPActionCreator.makeRequest(addTest(payload)));
  yield take(HTTPActionTypes.FINISH_REQUEST);
}

function* addFireBaseDataWatcher() {
  yield takeEvery(TestActionTypes.ADD_FIREBASE_DATA_TEST, addFireBaseDataWorker);
}

function* addFireBaseDataWorker({payload}) {
  yield put(FirebaseActionCreators.sendData(payload));
}

export default function* testSaga() {
  yield all([initRequestWatcher(), addFireBaseDataWatcher()]);
}
