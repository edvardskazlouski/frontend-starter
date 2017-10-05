import i18n from 'i18next';

// locales
import app from '../locales/en/app';
import home from '../locales/en/home';

i18n.init({
  debug: false,
  fallbackLng: 'en',

  ns: [ 'app', 'home' ],
  defaultNS: 'app',

  resources: {
    en: {
      app,
      home
    },
  }
});

export default i18n;
