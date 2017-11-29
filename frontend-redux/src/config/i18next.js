import i18n from 'i18next';

// locales
import EN from '../locales/en';
import RU from '../locales/ru';

i18n.init({
  debug: false,
  fallbackLng: ['EN', 'RU'],
  lng: 'EN',

  ns: [ 'app', 'home', 'reset', 'auth' ],
  defaultNS: 'app',

  resources: {
    EN,
    RU,
  }
});

export default i18n;
