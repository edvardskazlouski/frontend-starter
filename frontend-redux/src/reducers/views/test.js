import {
  fromJS,
} from 'immutable';

import ActionTypes from 'actionTypes/views/test';

const initialState = fromJS({
  isOk: false,
  submittedValue: ''
});

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case ActionTypes.SET_TEST: {
      return state.set('isOk', true);
    }

    case ActionTypes.SUBMIT_VALUE: {
      return state.set('submittedValue', payload);
    }

    default: {
      return state;
    }
  }
}
