import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

// actions creators
import * as TestViewActionCreators from '../../actionCreators/test';

export default function* testSaga() {
  yield delay(3000);
  yield put(TestViewActionCreators.setTest());
}
