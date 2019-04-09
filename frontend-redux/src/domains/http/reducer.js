import {
  fromJS,
} from 'immutable';

import ActionTypes from './actionsTypes';

const initialState = fromJS({
  requests: {}
});

export default function (state = initialState, action) {
  const requests = state.get('requests');
  switch (action.type) {
    case ActionTypes.START_REQUEST:
      return state.set('requests', requests.set(action.payload.id, 0));

    case ActionTypes.PROGRESS_REQUEST:
      return state.set('requests', requests.set(action.payload.id, action.payload.progress));

    case ActionTypes.FINISH_REQUEST:
      return state.set('requests', requests.delete(action.payload));

    default: {
      return state;
    }
  }
}
