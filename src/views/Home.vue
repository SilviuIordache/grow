<template lang="pug">
  .container.grow-card
    .row
      .col-12
        h1.mb-4 Grow 
        span Grow is a tool for evaluating your key life-areas. You do this through a quick 1-min quiz. A way to evaluate and visualize your life-pillars is through a Wheel-of-Life evaluation tool.

        p.mt-2 It's said that a happy life is a balanced life. A person is happy when the pillars of life are in balance. When the wheel is full, life is rolls fluidly, we can say we are happy.
        
        p Similarly, when some areas aren't doing so great, the wheel of life starts to roll out of balance, taking a toll on hapiness, which is at it's core.

        p The main life pillars are:
          
    .row(v-if="loading")
      .col-12.text-center
        .spinner-border.text-primary(role='status')
          span.sr-only Loading...

    .row(v-else)
      .col-12.col-sm-6.col-md-4.col-lg-3.my-3(v-for="pillar in pillars")
        .grow-card.p-4
          i.mr-2.fa-lg(:class="pillar.icon" :style="{ color: pillar.color}")
          span {{ pillar.name }}
    .row
      .col-12
        .evaluation-container.mt-5.text-center
          button.btn.btn-primary.btn-lg(role="button" type="button" @click="startEvaluation()") Start evaluation
    .row
      .col-12
        router-link(to="/pillars") Read more about the pillars of life
</template>

<script>
import { dbMixin }  from '../mixins/dbMixin.js';

export default {
  name: 'Home',
  mixins: [dbMixin],
  data() {
    return {
      pillars: [],
      loading: false
    }
  },
  async created() {
    await this.getPillars();
  },
  methods: {
    startEvaluation() {
      this.$router.push({ path: '/evaluationQuiz' })
    }
  }
};
</script>

<style scoped lang="stylus">
  .main
    color gray
</style>
