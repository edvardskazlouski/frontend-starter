import i18n from 'i18next';

// locales
import app from '../locales/en/app';
import home from '../locales/en/home';
import auth from '../locales/en/auth';
import reset from '../locales/en/reset';

i18n.init({
  debug: false,
  fallbackLng: 'en',

  ns: [ 'app', 'home', 'reset', 'auth' ],
  defaultNS: 'app',

  resources: {
    en: {
      app,
      home,
      auth,
      reset,
    },
  }
});

export default i18n;
