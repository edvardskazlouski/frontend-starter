import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';

import store  from './store';
import history from './store/history';
import i18n from './i18next';
import App from './App';
import registerServiceWorker from './services/registerServiceWorker';

render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
