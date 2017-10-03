import { all } from 'redux-saga/effects';

import routerSaga from './router';

export default function* rootSaga() {
  yield all([
    routerSaga(),
    // here can be only domain saga
  ]);
}
