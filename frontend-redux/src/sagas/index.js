import { all } from 'redux-saga/effects';

import routerSaga from './router';
import fileUploader from './fileUploader';
import { saga as testGroupsSaga } from 'domains/testGroups';
import { saga as httpSaga } from 'domains/http';
import { saga as firebaseSaga} from 'domains/firebase';

export default function* rootSaga() {
  yield all([
    routerSaga(),
    fileUploader(),
    // here can be only domain sagas
    testGroupsSaga(),
    httpSaga(),
    firebaseSaga()
  ]);
}
