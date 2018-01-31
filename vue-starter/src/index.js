import Vue from 'vue';
import App from './App.vue';
import store from 'store';
import routes from 'routes';
import VueRouter from 'vue-router';

const router = new VueRouter({
  routes,
  mode: 'history',
});

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
