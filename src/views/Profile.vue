<template lang="pug">
  .container
    .row.grow-card
      .col-12
        h1.mb-5 Profile
        p
          strong username:
          span.ml-1 {{ username }}
        p
          strong email: 
          span.ml-1 {{ email }}

</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Profile',
  data() {
    return {
      username: '',
      email: ''
    }
  },
  async mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const user = firebase.auth().currentUser;
        if (user) {
          this.username = user.displayName;
          this.email = user.email;
        }
      }
    });
  },
};
</script>

<style scoped lang="stylus">
  .main
    color gray
</style>
