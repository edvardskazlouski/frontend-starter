import {
  fromJS,
} from 'immutable';

import ActionTypes from 'actionTypes/uploadFiles';

const initialState = fromJS({
  loading: false,
});

export default function (state = initialState, { type, payload }) {
  switch (type) {

    case ActionTypes.LOADING_START:
      return state.set('loading', true);

    // case ActionTypes.LOADING_FINISH:
    //   return state.set('loading', false);

    case ActionTypes.UPLOAD_FILE_SUCCESS:
      return state.set('loading', false);

    case ActionTypes.UPLOAD_FILE_FAILURE:
      return state.set('loading', false);

    default: {
      return state;
    }
  }
}
