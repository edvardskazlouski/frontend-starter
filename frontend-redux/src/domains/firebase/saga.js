import { put, takeEvery, take, cancelled as cancelledSaga, select, race } from 'redux-saga/effects';
import ActionsTypes from './actionsTypes';

export function* addFirebaseDataSaga({ payload }) {
  console.log(payload);
}

export default function* firebaseSaga() {
  yield takeEvery(ActionsTypes.SEND_DATA, addFirebaseDataSaga);
}
