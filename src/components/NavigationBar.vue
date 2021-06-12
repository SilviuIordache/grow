<template lang="pug">
  .navbar.px-5.mb-5
    .container.d-block
      nav.navbar.navbar-light.navbar-expand-lg
        ul.navbar-nav.mr-auto
          li.nav-item
            router-link.nav-link(to="/" :class="{ 'active': $route.name === 'home' }") Home
          li.nav-item
            router-link.nav-link(to="/evaluation" :class="{ 'active': $route.name === 'evaluation' }") Evaluation
          li.nav-item
            router-link.nav-link(to="/results" :class="{ 'active': $route.name === 'results' }") Results
          li.nav-item
            router-link.nav-link(to="/goals" :class="{ 'active': $route.name === 'goals' }") Goals
        ul.navbar-nav.ml-auto(v-if="loggedIn")
          li.nav-item
            router-link.nav-link(to="/profile" :class="{ 'active': $route.name === 'profile' }") {{ userEmail }}
          li.nav-item
            a.nav-link(@click="signOut()" href="") Sign Out
          
        ul.navbar-nav(v-else)
          li.nav-item
            router-link.nav-link(to="/login" href="" :class="{ 'active': $route.name === 'login' }") Login
          li.nav-item
            router-link.nav-link(to="/register" href="" :class="{ 'active': $route.name === 'register' }") Register
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'NavigationBar',
  props: {
    userEmail: String,
    loggedIn: Boolean
  },
  methods: {
    async signOut() {
      try {
        const data = await firebase.auth().signOut();
        this.$router.push('/login')
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  }
};
</script>

<style scoped lang="stylus">
  .navbar
    background-color #f5f5f5
</style>
