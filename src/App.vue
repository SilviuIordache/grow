<template lang="pug">
  main
    navigation-bar(:username="username" :loggedIn="loggedIn" )
    router-view(:userID="userID")
</template>

<script>
import 'firebase/auth';
import NavigationBar from './components/NavigationBar.vue';
import { dbMixin } from './mixins/dbMixin.js';


export default {
  mixins: [dbMixin],
  name: 'App',
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
}
</script>

<style lang="stylus">
@require './style/cards.styl'
@require './style/evaluations.styl'
</style>