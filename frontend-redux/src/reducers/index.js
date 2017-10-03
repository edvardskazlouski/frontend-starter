import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form';

// domains
import { reducer as routing } from '../domains/routing';

// views

export default combineReducers({
  form: formReducer,

  // domains
  routing,

  // views
});
