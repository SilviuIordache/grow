import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import EvaluationDetails from '../views/EvaluationDetails.vue';
import Evaluations from '../views/Evaluations.vue';
import DetailedEvolution from '../views/DetailedEvolution.vue';
import EvaluationQuiz from '../views/EvaluationQuiz.vue';
import Results from '../views/Results.vue';
import Goals from '../views/Goals.vue';
import Profile from '../views/Profile.vue';
import Pillars from '../views/Pillars.vue';

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
      path: '/detailedEvolution',
      name: 'detailedEvolution',
      component: DetailedEvolution
    },
    {
      path: '/evaluations',
      name: 'evaluations',
      component: Evaluations
    },
    {
      path: '/evaluations/:id',
      name: 'EvaluationDetails',
      component: EvaluationDetails
    },
    {
      path: '/evaluationQuiz',
      name: 'evaluationQuiz',
      component: EvaluationQuiz
    },
    {
      path: '/results',
      name: 'results',
      component: Results
    },
    {
      path: '/pillars',
      name: 'pillars',
      component: Pillars
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