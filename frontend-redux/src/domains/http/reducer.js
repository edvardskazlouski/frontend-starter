import {
  fromJS,
} from 'immutable';

import ActionTypes from './actionsTypes';

const initialState = fromJS({
  progress: 0,
  isActive: false,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case ActionTypes.START_REQUEST:
      return state
        .set('isActive', true);

    case ActionTypes.PROGRESS_REQUEST:
      return state.set('progress', action.payload);

    case ActionTypes.FINISH_REQUEST:
      return state
        .set('isActive', false)
        .set('progress', 0);

    default: {
      return state;
    }
  }
}
