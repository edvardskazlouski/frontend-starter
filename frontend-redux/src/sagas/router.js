import { LOCATION_CHANGE } from 'connected-react-router';
import { takeEvery, cancel, call, fork, take } from 'redux-saga/effects';
import pathToRegexp from 'path-to-regexp';

// constants
import * as Routes from 'constants/routing';

// view sagas
import home from './views/home';
import test from './views/test';
import reset from './views/reset';

// init
import initialize from './initialize';

const viewSagas = {
  [Routes.HOME]: home,
  [Routes.TEST]: test,
  [Routes.RESET]: reset,
};

let task = null;
let taskRoute = null;
function* onchange(action) {
  const {
    hash,
    pathname,
    search,
  } = action.payload.location;

  if (task) {
    yield cancel(task);
  }
  Object.keys(viewSagas).forEach(path => {
    if (pathname.match(pathToRegexp(path))) {
      taskRoute = path;
    }
  });

  task = yield fork(viewSagas[taskRoute], search, hash);
  console.log(task);
}

export default function* routerSaga() {
  yield takeEvery(LOCATION_CHANGE, onchange);
  yield call(initialize);
  const action = yield take(LOCATION_CHANGE);
  yield call(onchange, action);
}
