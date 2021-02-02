<template lang="pug">
  .main.container
    .row
      .col-12
        h1 Grow
        span Grow is a tool for evaluating your key life-areas. You do this through a quick 1-min quiz.
        p A way to evaluate and visualize your life-pillars is through a Wheel-of-Life evaluation tool.

        p It's said that a happy life is a balanced life. A person is happy when the pillars of life are in balance. 
        
        p When the wheel is full, life is rolls fluidly, we can say we are happy.
        
        p Similarly, when some areas aren't doing so great, the wheel of life starts to roll out of balance, taking a toll on hapiness, which is at it's core.

        p The main life pillars are: Love, Finances, Relationships, Career, Fun, Health, Mind, Purpose.
        .evaluation-container.mt-3
          button.btn.btn-primary(role="button" type="button" @click="startEvaluation()") Start
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
