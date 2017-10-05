import { all } from 'redux-saga/effects';

import routerSaga from './router';
import { saga as testGroupsSaga } from 'domains/testGroups';

export default function* rootSaga() {
  yield all([
    routerSaga(),
    // here can be only domain sagas
    testGroupsSaga()
  ]);
}
