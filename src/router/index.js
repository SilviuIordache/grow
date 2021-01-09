import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '../views/Main.vue'


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
  ]
})

export default router;