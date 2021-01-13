import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '../views/Main.vue';
import Evaluation from '../views/Evaluation.vue';
import Results from '../views/Results.vue';
import Goals from '../views/Goals.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/evaluation',
      name: 'Evaluation',
      component: Evaluation
    },
    {
      path: '/results',
      name: 'Results',
      component: Results
    },
    {
      path: '/goals',
      name: 'Goals',
      component: Goals
    }
  ]
})

export default router;