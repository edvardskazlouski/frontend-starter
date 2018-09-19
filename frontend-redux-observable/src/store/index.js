import { createStore, applyMiddleware, compose } from 'redux';
import Immutable, { Map } from 'immutable';
import installDevTools from 'immutable-devtools';

// router
import history from './history';
import { routerMiddleware } from 'react-router-redux';

// middlewares
import persistState from 'redux-localstorage';

//helpers
import getLocalStorageConfig from 'services/localstorage';
import rootReducer from 'reducers';

// constants
import LOCAL_STORAGE_CONFIG from 'constants/localstorage';

const initialState = Map();

const enhancers = [persistState(['routing'], getLocalStorageConfig('starter', LOCAL_STORAGE_CONFIG))];
const middleware = [
  routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  installDevTools(Immutable);
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

export default store;
