import { RSAA } from 'redux-api-middleware';
import { put, all, takeEvery, take, race } from 'redux-saga/effects';
import ActionsTypes from './actionsTypes';
import {
  API_URL
} from './constants';
import { LOCATION_CHANGE } from 'connected-react-router';

function* makeRequestWatcher() {
  yield takeEvery(ActionsTypes.MAKE_REQUEST, makeRequestWorker);
}

function* makeRequestWorker({ payload }) {
  const request = payload;
  request[RSAA].endpoint = API_URL + request[RSAA].endpoint;
  request[RSAA].headers = {
    'Content-Type': 'application/json',
  };

  yield put(request);
}

function* makeCancelableRequestWatcher() {
  yield takeEvery(ActionsTypes.MAKE_CANCELABLE_REQUEST, makeCancelableRequestWorker);
}

function* makeCancelableRequestWorker({ payload }) {
  const controller = new AbortController();
  const signal = controller.signal;
  const request = payload;

  request[RSAA].options = { signal };
  request[RSAA].endpoint = API_URL + request[RSAA].endpoint;
  request[RSAA].headers = {
    'Content-Type': 'application/json',
  };

  yield put(request);

  const { cancel } = yield race({
    cancel: take(LOCATION_CHANGE),
    response: take([
      request[RSAA].types[1],
      request[RSAA].types[2],
    ]),
  });

  if (cancel) {
    controller.abort();
  }
}

export default function* profileSaga () {
  yield all([
    makeRequestWatcher(),
    makeCancelableRequestWatcher(),
  ]);
}
