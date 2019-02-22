import { put, delay } from 'redux-saga/effects';

// actions creators
import * as TestViewActionCreators from '../../actionCreators/views/test';

export default function* testSaga() {
  yield delay(3000);
  yield put(TestViewActionCreators.setTest());
}
