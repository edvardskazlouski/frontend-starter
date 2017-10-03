import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form';

// domains
import { reducer as routing } from '../domains/routing';
import { reducer as testGroups } from '../domains/testGroups';

// views
import test from './views/test';

export default combineReducers({
  form: formReducer,

  // domains
  routing,
  testGroups,

  // views
  test,
});
