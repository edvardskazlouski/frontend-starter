import ActionTypes from 'actionTypes/loading';
import { fromJS } from 'immutable';

const initialState = fromJS({
  isLoading: false,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case ActionTypes.LOADING_START: {
      return state.set('isLoading', true);
    }

    case ActionTypes.LOADING_FINISH: {
      return state.set('isLoading', false);
    }

    default: {
      return state;
    }
  }
}
