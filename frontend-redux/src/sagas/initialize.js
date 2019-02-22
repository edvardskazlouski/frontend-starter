import { put, delay } from 'redux-saga/effects';

import {
  startLoading,
  stopLoading,
} from 'actionCreators/loading';

export default function* initializeSaga() {
  yield put(startLoading());

  yield delay(3000);

  yield put(stopLoading());
}
