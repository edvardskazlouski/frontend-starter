import {
  fromJS,
} from 'immutable';

import ActionTypes from 'actionTypes/uploadFiles';

const initialState = fromJS({
  loading: false,
  error: {},
});

export default function (state = initialState, { type, payload }) {
  switch (type) {

    case ActionTypes.LOADING_START:
      return state.set('loading', true);

    case ActionTypes.UPLOAD_FILE_SUCCESS:
      return state.set('loading', false);

    case ActionTypes.UPLOAD_FILE_FAILURE:
      return state
        .set('loading', false)
        .set('error', fromJS(payload));

    default: {
      return state;
    }
  }
}
