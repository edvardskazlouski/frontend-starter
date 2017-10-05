import { Stack } from 'immutable';

import ActionTypes from 'actionTypes/modals';

const initialState = Stack();

export default function (state = initialState, action) {
  switch (action.type) {

    case ActionTypes.OPEN: {
      return state.push(action.payload.type);
    }

    case ActionTypes.CLOSE: {
      return state.pop();
    }

    default: {
      return state;
    }
  }
}
