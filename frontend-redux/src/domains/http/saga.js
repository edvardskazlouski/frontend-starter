import { put, takeEvery, take, cancelled as cancelledSaga, select } from 'redux-saga/effects';
import ActionsTypes from './actionsTypes';
import * as ActionsCreators from './actionsCreators';
import * as UsersSelectors from 'domains/user/selectors';
import { eventChannel, END } from 'redux-saga';
import noop from 'lodash/noop';
import toPairs from 'lodash/toPairs';
import { API_URL } from './constants';

const XHR_DONE_STATE = 4;

function xhrWithEventChannel() {
  const xhr = new XMLHttpRequest();
  let xhrCancelled = false;
  let cancellationSignal = noop;
  const xhrEventChannel = eventChannel((emitter) => {
    if (xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.floor(event.loaded / event.total * 100 / 2);
          emitter({ progress });
        }
      };
    }
    xhr.onprogress = (progress) => {
      emitter({
        progress: 50 + Math.floor(progress.loaded / progress.total * 100 / 2),
      });
    };

    xhr.onload = () => {
      emitter({
        done: true,
        ok: xhr.status < 400,
        status: xhr.status,
        statusText: xhr.statusText,
        response: xhr.response,
        progress: 100,
      });
    };
    xhr.onerror = () => {
      emitter({
        done: true,
        ok: false,
        status: xhr.status,
        statusText: xhr.statusText,
        response: xhr.response,
      });
    };
    cancellationSignal = () => {
      emitter(END);
    };
    return () => {
      cancellationSignal = noop;
      if (xhr.readyState !== XHR_DONE_STATE) {
        xhrCancelled = true;
        xhr.abort();
      }
    };
  });
  return {
    isCancelled() {
      return xhrCancelled;
    },
    cancellationSignal,
    rawXhr: xhr,
    xhrEventChannel,
    setHeaders: (name, value) => {
      if (typeof name === 'string') {
        if (value) {
          xhr.setRequestHeader(name, value);
        }
      } else {
        const headers = name;
        // eslint-disable-next-line no-restricted-syntax
        for (const [_name, _value] of toPairs(headers)) {
          xhr.setRequestHeader(_name, _value);
        }
      }
    },
  };
}

function tryParseJson(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

export function* reduxExtendedRequestSaga({ payload }) {
  const { ACTIONS, url, config, meta } = payload;
  const { method, headers, body, useAccessToken } = config;
  const fullUrl = `${API_URL}${url}`;
  const accessToken = useAccessToken ? yield select(UsersSelectors.accessToken) : null;

  const { rawXhr, setHeaders, cancellationSignal, isCancelled, xhrEventChannel } = xhrWithEventChannel();

  try {
    rawXhr.open(method, fullUrl);
    setHeaders({
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : null,
      ...headers,
    });
    yield put(ACTIONS.start({ ...meta, cancellationSignal }));
    rawXhr.send(body);
    yield put(ActionsCreators.startRequest());
    while (true) {
      const event = yield take(xhrEventChannel);
      yield put(ActionsCreators.progressRequest(event.progress));
      if (event.done) {
        if (event.ok) {
          const response = tryParseJson(event.response);
          return yield put(ACTIONS.success(response, meta));
        }
        throw new Error(`[fancyXHR] failed to call: ${fullUrl}`);
      }
    }
  } catch (e) {
    return yield put(ACTIONS.error(e, meta));
  } finally {
    yield put(ActionsCreators.finishRequest());
    if (yield cancelledSaga()) {
      xhrEventChannel.close();
      yield put(ACTIONS.cancel(meta));
    } else if (isCancelled()) {
      yield put(ACTIONS.cancel(meta));
    }
  }
}

export default function* httpSaga() {
  yield takeEvery(ActionsTypes.MAKE_REQUEST, reduxExtendedRequestSaga);
}
