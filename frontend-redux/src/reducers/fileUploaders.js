import {
  fromJS,
} from 'immutable';

import ActionTypes from 'actionTypes/fileUploader';

const initialState = fromJS({});

const uploaderInitialState = fromJS({
  isLoading: false,
  files: [],
  error: null,
});

export default function(state = initialState, { type, payload }) {
  switch (type) {

    case ActionTypes.REGISTER_UPLOADER:
      return state.setIn(
        [payload.form, payload.name],
        uploaderInitialState
      );

    case ActionTypes.DEREGISTER_UPLOADER:
      return state.update(
          payload.form,
          uploaders => uploaders.delete(payload.name),
        );

    case ActionTypes.LOADING_START:
      return state.setIn(
        [payload.form, payload.name, 'isLoading'],
        true,
      );

    case ActionTypes.UPLOAD_FILES_SUCCESS:
      return state
        .setIn([payload.form, payload.name, 'files'], fromJS(payload.files))
        .setIn([payload.form, payload.name, 'isLoading'], false);

    case ActionTypes.UPLOAD_FILES_FAILURE:
      return state
        .setIn([payload.form, payload.name, 'error'], fromJS(payload.error))
        .setIn([payload.form, payload.name, 'isLoading'], false);

    default: {
      return state;
    }
  }
}
