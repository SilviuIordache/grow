<template lang="pug">
  .container
    .row.mb-3
      .col-12
        .grow-card
          h3.mb-3 New evaluation
          p Take a new evaluation quiz
          button.btn.btn-primary(@click="startNewEvaluation()") Start
    .grow-card
      .row
        .col-12.mb-4
            h3 Your evaluations
      .row
        .col-12.col-sm-4
          .grow-card.p-3
            p An evaluation will come here
            p 2021-06-02, 15:32:23
</template>

<script>
export default {
  data() {
    return {
      a: true
    }
  },
  methods: {
    startNewEvaluation() {
      this.$router.push({ path: '/evaluationQuiz' })
    }
  }
};
</script>

<style scoped lang="stylus">
  .ceva
    color black
</style>
