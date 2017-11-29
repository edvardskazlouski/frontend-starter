import { takeEvery, call, put, all } from 'redux-saga/effects';
import ActionTypes from 'actionTypes/uploadFiles';
import { uploadFileToAWS } from 'services/aws';

function* uploadFileFunc({ payload }) {
  try {
    yield put({ type: ActionTypes.LOADING_START});
    yield all(
      Array
        .from(payload)
        .map(file => call(uploadFileToAWS, file, file.name))
    );
    yield put({ type: ActionTypes.UPLOAD_FILE_SUCCESS });
  } catch (err) {
    yield put({ type: ActionTypes.UPLOAD_FILE_FAILURE, err });
  }
}

export default function* uploadFile() {
  yield takeEvery(ActionTypes.UPLOAD_FILE, uploadFileFunc);
}
