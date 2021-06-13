<template lang="pug">
  main
    navigation-bar(:username="username" :loggedIn="loggedIn")
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
      username: '',
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
          this.username = firebase.auth().currentUser.displayName;
        }
      })
    }
  }
}
</script>