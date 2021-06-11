<template lang="pug">
  .main.container
    .row
      .col-12.d-flex.justify-content-center
        form(@submit.prevent="register")
          .form-field
            label.d-block Email
            input(type="email" v-model="email")
          .form-field
            label.d-block Password
            input(type="password" v-model="password")

          button Register
</template>

<script>

export default {
   data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      console.log(this.email, this.password);
    }  
  }
};
</script>

<style scoped lang="stylus">
  .form-field
    margin-bottom 1.5rem
</style>
