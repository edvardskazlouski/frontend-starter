import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router/immutable';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

// generic
import modals from './modals';
import routing from './routing';
import loading from './loading';
import fileUploaders from './fileUploaders';

// domains
import { reducer as testGroups } from 'domains/testGroups';
import { reducer as user } from 'domains/user';
import { reducer as http } from 'domains/http';

// views
import test from './views/test';

export default (history) => combineReducers({
  form: formReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  // generic
  router: connectRouter(history),

  // routing,
  modals,
  loading,
  fileUploaders,

  // domains
  testGroups,
  user,
  http,

  // views
  test,
});
