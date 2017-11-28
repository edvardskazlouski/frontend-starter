import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './services/registerServiceWorker';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { I18nextProvider } from 'react-i18next';
import i18n from 'config/i18next';

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import theme from './theme';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

import { Provider } from 'react-redux';
import store from './store';
import history from './store/history';

import { ConnectedRouter } from 'react-router-redux';

const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <JssProvider jss={jss}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      </JssProvider>
    </MuiThemeProvider>
  </I18nextProvider>,
  document.getElementById('root')
);

registerServiceWorker();
