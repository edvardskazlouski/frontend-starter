import { createStore, applyMiddleware, compose } from 'redux';
import { Map } from 'immutable';
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';

// router
import history from './history';
import { routerMiddleware } from 'connected-react-router/immutable';

// middlewares
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';

//helpers
import getLocalStorageConfig from 'services/localstorage';
import rootReducer from 'reducers';
import rootSaga from 'sagas';

// constants
import LOCAL_STORAGE_CONFIG from 'constants/localstorage';

const initialState = Map();

const enhancers = [persistState(['token'], getLocalStorageConfig(LOCAL_STORAGE_CONFIG))];
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  routerMiddleware(history),
  sagaMiddleware,
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
  rootReducer(history),
  initialState,
  composedEnhancers,
);

sagaMiddleware.run(rootSaga);

export default store;
