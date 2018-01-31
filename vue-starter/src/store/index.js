import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate';
import LocalStorageConfig from 'constants/localstorage';

// modules
import user from 'store/modules/user';
import modals from 'store/modules/modals';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const plugins = [ createPersistedState(LocalStorageConfig) ];

export default new Vuex.Store({
  modules: {
    user,
    modals,
  },
  strict: debug,
  plugins: debug ? plugins.concat(createLogger()) : plugins,
});
