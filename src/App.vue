<template lang="pug">
  main
    navigation-bar(:username="username" :loggedIn="loggedIn" )
    router-view(:userID="userID")
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
      userID: ''
    }
  },
  async mounted() {
    await this.getAuthData();
  },
  methods: {
    getAuthData() {
      firebase.auth().onAuthStateChanged(user => {
        this.loggedIn = !!user;
        if (this.loggedIn) {
          this.username = user.displayName;
          this.userID = user.uid;
        }
      })
    }
  }
}
</script>

<style lang="stylus">
@require './style/cards.styl'
</style>