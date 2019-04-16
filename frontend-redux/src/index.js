import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './services/registerServiceWorker';
import { I18nextProvider } from 'react-i18next';
import i18n from 'config/i18next';

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import theme from './theme';
import { createGenerateClassName, createMuiTheme, jssPreset } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import store from './store';
import history from './store/history';

import { ConnectedRouter } from 'connected-react-router/immutable';

const jss = create({
  ...jssPreset()
});

const generateClassName = createGenerateClassName();

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
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
