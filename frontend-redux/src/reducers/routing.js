import { LOCATION_CHANGE } from 'connected-react-router';
import { fromJS } from 'immutable';

const initialState = fromJS({
  location: {},
});
export default function (state = initialState, action) {
  switch (action.type) {

    case LOCATION_CHANGE: {
      return state.set('location', fromJS(action.payload));
    }

    default: {
      return state;
    }
  }
}
