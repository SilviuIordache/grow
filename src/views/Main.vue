<template lang="pug">
  .main.container
    .row
      .col-12
        span Grow by evaluating your key life-areas
        .evaluation-container
          button.btn.btn-primary(@click="startEvaluation()") Start
</template>

<script>
export default {
  methods: {
    startEvaluation() {
      this.$router.push({ path: '/evaluation' })
    }
  }
};
</script>

<style scoped lang="stylus">
  .main
    color gray
</style>
