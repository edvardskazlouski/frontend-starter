import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// modules
import user from 'store/modules/user';
import modals from 'store/modules/modals';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
    modals,
  },
  strict: debug,
  plugins: debug ? [ createLogger() ] : []
});
