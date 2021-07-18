<template lang="pug">
  .container
    .row
      .col-12.d-flex.justify-content-center
        form(@submit.prevent="login")
          h1.mb-5 Login
          .form-group
            label(for='emailInput') Email address
            input#emailInput.form-control(type='username' v-model="email" placeholder='Email')
          .form-group
            label(for='passInput') Password
            input#passInput.form-control(type='password' v-model="password" placeholder='Password')

          button.mt-4.btn.btn-primary(type='submit') Login

          .error(v-if="error") 
            p {{ error }}
          .register-link-container.mt-4
            router-link(to="/register") New user? Click here to register

</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Login',
  data() {
  return {
    email: '',
    password: '',
    error: ''
  }
  },
  methods: {
    async login() {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        this.$router.push('/');
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
