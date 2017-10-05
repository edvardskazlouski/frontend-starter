import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';

// provides ui theme to styles functions
import { ThemeProvider } from 'react-jss';
import { MuiThemeProvider } from 'material-ui/styles';

import store  from 'store';
import history from 'store/history';

import theme from 'theme';

import i18n from 'config/i18next';
import App from 'App';
import registerServiceWorker from 'services/registerServiceWorker';

render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </ThemeProvider>
      </MuiThemeProvider>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
