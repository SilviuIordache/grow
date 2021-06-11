<template lang="pug">
  .navbar.py-4.px-5.mb-5
    .container
      .d-flex.justify-content-start
        router-link(to="/") Home
        router-link.ml-4(to="/evaluation") Evaluation
        router-link.ml-4(to="/results") Results
        router-link.ml-4(to="/goals") Goals
      .d-flex.justify-content-end
        router-link.ml-4(to="/register") Register
        router-link.ml-4(to="/login") Login

</template>

<script>
export default {
  name: 'NavigationBar',
};
</script>

<style scoped lang="stylus">
  .navbar
    background-color #f5f5f5
  ul
    list-style-type none
    padding 0

  li
    display inline-block
    margin 0 10px
</style>
