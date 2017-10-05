import {
  fromJS,
  List
} from 'immutable';

import ActionTypes from './actionTypes';

const initialState = fromJS({
  groups: [],
});

export default function (state = initialState, action) {
  switch (action.type) {

    case ActionTypes.LOAD_GROUPS_SUCCESS:
      return state.set('groups', fromJS(action.payload));

    case ActionTypes.LOAD_GROUPS_FAILURE:
      return state.set('groups', new List());

    default: {
      return state;
    }
  }
}
