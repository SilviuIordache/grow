<template lang="pug">
  .navbar.d-flex.justify-content-start.py-4.px-5.mb-5
    router-link(to="/") Home
    router-link.ml-4(to="/evaluation") Evaluation
    router-link.ml-4(to="/results") Results
    router-link.ml-4(to="/goals") Goals

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
