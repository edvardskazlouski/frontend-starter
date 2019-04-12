import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './services/registerServiceWorker';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from 'config/i18next';

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import theme from './theme';
import { createGenerateClassName, createMuiTheme, jssPreset } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import store from './store';
import history from './store/history';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from 'config/fbConfig';
import config from 'config/fbConfig';

import { ConnectedRouter } from 'connected-react-router/immutable';

const jss = create({
  ...jssPreset()
});

const rrfProps = {
  firebase,
  config: config,
  dispatch: store.dispatch,
  createFirestoreInstance
};

const generateClassName = createGenerateClassName();

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <ReactReduxFirebaseProvider {...rrfProps}>
              <App />
            </ReactReduxFirebaseProvider>
          </ConnectedRouter>
        </Provider>
      </JssProvider>
    </MuiThemeProvider>
  </I18nextProvider>,
  document.getElementById('root')
);

registerServiceWorker();
