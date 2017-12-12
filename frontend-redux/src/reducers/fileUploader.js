import {
  fromJS,
} from 'immutable';

import ActionTypes from 'actionTypes/fileUploader';

const initialState = fromJS({
  loading: false,
  loadedFiles: [],
  error: {},
});

export default function (state = initialState, { type, payload }) {
  switch (type) {

    case ActionTypes.LOADING_START:
      return state.set('loading', true);

    case ActionTypes.UPLOAD_FILE_SUCCESS:
      return state
        .set('loadedFiles', fromJS(payload))
        .set('loading', false);

    case ActionTypes.UPLOAD_FILE_FAILURE:
      return state
        .set('loading', false)
        .set('error', fromJS(payload));

    default: {
      return state;
    }
  }
}
