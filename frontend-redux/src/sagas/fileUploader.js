import { takeEvery, call, put, all } from 'redux-saga/effects';
import ActionTypes from 'actionTypes/fileUploader';
import { uploadFileToAWS } from 'services/aws';
import { generateFileName } from 'helpers/generateFileName';
import config from 'constants/aws';

function* uploadFileFunc({ payload }) {
  try {
    yield put({
      type: ActionTypes.LOADING_START,
      payload: {
        form: payload.form,
        name: payload.name,
      }
    });

    const files = Array
      .from(payload.files)
      .map(file => {
        const newName = generateFileName();
        const src = `https://s3.${config.AWS_REGION}.amazonaws.com/${config.bucket}/${newName}`;
        return { file , newName, src };
      });

    yield all(
      files.map(({ file, newName }) => call(uploadFileToAWS, file, newName))
    );
    yield put({
      type: ActionTypes.UPLOAD_FILES_SUCCESS,
      payload: {
        form: payload.form,
        name: payload.name,
        files,
      }
    });
  } catch (error) {
    yield put({
      type: ActionTypes.UPLOAD_FILES_FAILURE,
      payload: {
        form: payload.form,
        name: payload.name,
        error,
      }
    });
  }
}

export default function* uploadFile() {
  yield takeEvery(ActionTypes.UPLOAD_FILES, uploadFileFunc);
}
