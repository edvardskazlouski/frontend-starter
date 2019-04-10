import { LOCATION_CHANGE } from 'connected-react-router';
import { takeEvery, cancel, call, fork, take } from 'redux-saga/effects';
import { matchPath } from 'react-router';

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

function* onchange(action) {
  let {
    hash,
    pathname,
    search,
  } = action.payload.location;

  if (task) {
    yield cancel(task);
  }

  if (pathname.includes('/reset')) {
    const pathName = pathname.substr(pathname.lastIndexOf('/') + 1);
    pathname = matchPath(pathname, {
      path:`/reset/:${pathName}`,
      exact: true
    }).path;
  }
  if (pathname in viewSagas) {
    task = yield fork(viewSagas[pathname], search, hash);
  }
}

export default function* routerSaga() {
  const action = yield take(LOCATION_CHANGE);
  yield call(initialize);
  yield takeEvery(LOCATION_CHANGE, onchange);
  yield call(onchange, action);
}
