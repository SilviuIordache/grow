import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from './firebase.js';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

Vue.prototype.$db = db;
Vue.prototype.$firebase = firebase

const app = new Vue({
  el: '#app',
  router: router,
  render: (h) => h(App)
})

export default app;