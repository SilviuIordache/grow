<template lang="pug">
  main
    navigation-bar(:userEmail="userEmail" :loggedIn="loggedIn")
    router-view
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import NavigationBar from './components/NavigationBar.vue';

export default {
  components: {
    'navigation-bar': NavigationBar
  },
  data() {
    return {
      userEmail: '',
      loggedIn: false,
    }
  },
  mounted() {
    this.getAuthData();
  },
  methods: {
    getAuthData() {
      firebase.auth().onAuthStateChanged(user => {
        this.loggedIn = !!user;
        if (this.loggedIn) {
          this.userEmail = firebase.auth().currentUser.email;
        }
      })
    }
  }
}
</script>