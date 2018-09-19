import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

// generic
import routing from './routing';
import modals from './modals';

export default combineReducers({
  form: formReducer,

  // generic
  routing,
  modals,
});
