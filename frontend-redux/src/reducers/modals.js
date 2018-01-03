import { Stack, fromJS } from 'immutable';

import ActionTypes from 'actionTypes/modals';

const initialState = Stack();

export default function (state = initialState, { type, payload }) {
  switch (type) {

    case ActionTypes.OPEN: {
      return state.push(
        fromJS(payload),
      );
    }

    case ActionTypes.CLOSE: {
      return state.pop();
    }

    default: {
      return state;
    }
  }
}
