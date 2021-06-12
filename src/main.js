import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js'
import firebase from 'firebase/app';
import { firebaseConfig } from './firebase.js';

firebase.initializeApp(firebaseConfig);

Vue.config.devtools = true;

const app = new Vue({
  el: '#app',
  router: router,
  render: (h) => h(App)
})

export default app;