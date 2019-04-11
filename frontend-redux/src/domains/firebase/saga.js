import { takeEvery, call } from 'redux-saga/effects';
import ActionsTypes from './actionsTypes';
import rsf from './rsf';


export function* addFirebaseDataSaga({ payload }) {
  yield call(rsf.firestore.addDocument, 'user', payload);
}

export default function* firebaseSaga() {
  yield takeEvery(ActionsTypes.SEND_DATA, addFirebaseDataSaga);
}

