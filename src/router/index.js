import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '../views/Main.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Evaluation from '../views/Evaluation.vue';
import Results from '../views/Results.vue';
import Goals from '../views/Goals.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: Evaluation
    },
    {
      path: '/results',
      name: 'results',
      component: Results
    },
    {
      path: '/goals',
      name: 'goals',
      component: Goals
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

export default router;