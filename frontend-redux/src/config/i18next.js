import i18n from 'i18next';

// locales
import US from '../locales/en';
import RU from '../locales/ru';

i18n.init({
  debug: false,
  fallbackLng: ['US', 'RU'],
  lng: 'US',

  ns: [ 'app', 'home', 'reset', 'auth' ],
  defaultNS: 'app',

  resources: {
    US,
    RU,
  }
});

export default i18n;
