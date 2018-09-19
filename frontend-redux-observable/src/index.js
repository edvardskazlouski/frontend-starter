import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import { MuiThemeProvider, createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { ConnectedRouter } from 'react-router-redux';

import { Provider } from 'react-redux';

import App from './App';

import store from './store';
import history from './store/history';

import i18n from 'config/i18next';

import theme from './theme';

const jss = create(jssPreset());
jss.options.createGenerateClassName = createGenerateClassName;

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <MuiThemeProvider theme={theme}>
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
