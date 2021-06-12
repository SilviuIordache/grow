import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Evaluation from '../views/Evaluation.vue';
import Results from '../views/Results.vue';
import Goals from '../views/Goals.vue';
import Profile from '../views/Profile.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})

export default router;