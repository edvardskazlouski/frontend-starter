import { put, takeEvery, take, cancelled as cancelledSaga, select, race } from 'redux-saga/effects';
import ActionsTypes from './actionsTypes';
import * as ActionsCreators from './actionsCreators';
import * as UsersSelectors from 'domains/user/selectors';
import { eventChannel, END } from 'redux-saga';
import noop from 'lodash/noop';
import toPairs from 'lodash/toPairs';
import uuid from 'uuid/v4';

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
  const { method, headers, body, useAccessToken, cancelActionTypes = [] } = config;

  const { rawXhr, setHeaders, cancellationSignal, isCancelled, xhrEventChannel } = xhrWithEventChannel();

  const id = uuid();

  try {
    rawXhr.open(method, url);
    setHeaders({
      'Content-Type': 'application/json',
      ...headers,
    });
    if (useAccessToken) {
      const token = yield select(UsersSelectors.accessToken);
      setHeaders({
        Authorization: token,
      });
    }

    yield put(ACTIONS.start({ ...meta, cancellationSignal }));
    rawXhr.send(body);
    yield put(ActionsCreators.startRequest({ id }));
    while (true) {
      const { event, cancel } = yield race({
        event: take(xhrEventChannel),
        cancel: take(cancelActionTypes)
      });

      if (cancel) {
        cancellationSignal();
      } else {
        const { progress } = event;
        yield put(ActionsCreators.progressRequest({ progress, id }));
        if (event.done) {
          if (event.ok) {
            const response = tryParseJson(event.response);
            return yield put(ACTIONS.success(response, meta));
          }
          throw new Error(`[fancyXHR] failed to call: ${url}`);
        }
      }
    }
  } catch (e) {
    return yield put(ACTIONS.error(e, meta));
  } finally {
    if (yield cancelledSaga()) {
      xhrEventChannel.close();
      yield put(ACTIONS.cancel(meta));
    } else if (isCancelled()) {
      yield put(ACTIONS.cancel(meta));
    }
    yield put(ActionsCreators.finishRequest(id));
  }
}

export default function* httpSaga() {
  yield takeEvery(ActionsTypes.MAKE_REQUEST, reduxExtendedRequestSaga);
}
