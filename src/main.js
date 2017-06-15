// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import axios from 'axios';
import goods from 'components/goods/goods.vue';
import seller from 'components/seller/seller.vue';
import ratings from 'components/ratings/ratings.vue';

import 'common/css/index.styl';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(axios);

const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: goods
  },
  {
    path: '/seller',
    component: seller
  },
  {
    path: '/ratings',
    component: ratings
  }
];

const router = new VueRouter({
  'linkActiveClass': 'active',
   routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

