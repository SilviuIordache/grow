<template lang="pug">
  .container
    .row
      .col-12.d-flex.justify-content-center
        form(@submit.prevent="register")
          h1.mb-5 Registration
          .form-group
            label(for='usernameInput') Username
            input#usernameInput.form-control(type='username' v-model="username" placeholder='Username')
          .form-group
            label(for='emailInput') Email address
            input#emailInput.form-control(type='email' v-model="email" placeholder='Email')
          .form-group
            label(for='passInput') Password
            input#passInput.form-control(type='password' v-model="password" placeholder='Password')

          button.mt-4.btn.btn-primary(type='submit') Register

          .error(v-if="error") 
            p {{ error }}

</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
   data() {
    return {
      username: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async register() {
      try {
        const response = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);

        response.user.updateProfile({
          displayName: this.username
        });

        this.$router.push('/')
      } catch (err) {
        this.error = err.message;
        console.log(err);
      }
    }  
  }
};
</script>

<style scoped lang="stylus">
  form
    width 20rem  
  .error
    color red
</style>
