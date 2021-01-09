<template lang="pug">
  .navbar.d-flex.justify-content-between.py-4.px-5.
    HOME
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
