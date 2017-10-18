import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form';

// generic
import modals from './modals';
import routing from './routing';
import loading from './loading';

// domains
import { reducer as testGroups } from 'domains/testGroups';

// views
import test from './views/test';

export default combineReducers({
  form: formReducer,

  // generic
  routing,
  modals,
  loading,

  // domains
  testGroups,

  // views
  test,
});
