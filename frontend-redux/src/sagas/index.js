import { all } from 'redux-saga/effects';

import routerSaga from './router';
import uploadFilesSaga from './uploadFiles';
import { saga as testGroupsSaga } from 'domains/testGroups';

export default function* rootSaga() {
  yield all([
    routerSaga(),
    uploadFilesSaga(),
    // here can be only domain sagas
    testGroupsSaga(),
  ]);
}
