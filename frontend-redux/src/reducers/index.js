import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router/immutable';

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

export default (history) => combineReducers({
  form: formReducer,

  // generic
  router: connectRouter(history),

  // routing,
  modals,
  loading,
  fileUploaders,

  // domains
  testGroups,
  user,

  // views
  test,
});
