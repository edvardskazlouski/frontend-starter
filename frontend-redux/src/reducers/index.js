import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form';

// generic
import modals from './modals';
import routing from './routing';
import loading from './loading';
import fileUploaders from './fileUploaders';

// domains
import { reducer as testGroups } from 'domains/testGroups';
import { reducer as user } from 'domains/user';

// views
import test from './views/test';

export default combineReducers({
  form: formReducer,

  // generic
  routing,
  modals,
  loading,
  fileUploaders,

  // domains
  testGroups,
  user,

  // views
  test,
});
