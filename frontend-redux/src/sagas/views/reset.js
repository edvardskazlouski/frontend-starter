import { matchPath } from 'react-router';
import { put, call, select, all, takeEvery, delay } from 'redux-saga/effects';

import {
  startLoading,
  stopLoading,
} from 'actionCreators/loading';

import { RESET } from 'constants/routing';
import { route } from 'selectors/routing';

import ActionTypes from 'actionTypes/forms/resetPassword';

import resetPasswordSaga from '../forms/resetPassword';

function* loadingSaga() {
  yield put(startLoading());
  const pathname = yield select(route);
  const activationLink = yield call(matchPath, pathname, {
    path: RESET,
    exact: true,
  });
  console.log(activationLink.params.activationLink);

  yield delay(3000);

  yield put(stopLoading());
}

export default function* resetSaga () {
  yield all([
    loadingSaga(),
    takeEvery(ActionTypes.RESET_PASSWORD, resetPasswordSaga)
  ]);
}
