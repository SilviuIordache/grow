<template lang="pug">
  .main.container
    .row(v-if="!this.pillars").
      Loading..
    .row(v-else)
      .col-12.d-flex.justify-content-center
        .question-container
          p {{ currentQuestion + 1}} / {{ pillars.length }}
          p On a scale from 1 to 10, how would you rate your {{ pillars[currentQuestion].name }}?
          .form
            .form-check.form-check-inline.mr-2(v-for="index in 10" :key="index")
              input.form-check-input(type='radio' :value="index" v-model="pillars[currentQuestion].rating")
              label.form-check-label {{ index }}
          .buttons-container.mt-4
            .nav-buttons
              button.btn.btn-primary.mr-4(v-if="currentQuestion > 0" @click="back()" ).
                Back
              button.btn.btn-primary(role="button" type="button" @click="next()" :disabled="!pillars[currentQuestion].rating")
                span(v-if="currentQuestion < pillars.length - 1") Next
                span(v-else) Show Results
          .answer-container.mt-4
            p(v-if="pillars[currentQuestion].rating === 0") Rate this area to continue
            p(v-else) You rated {{ pillars[currentQuestion].name}} with {{ pillars[currentQuestion].rating }}/10
</template>

<script>
import pillarStorage from '../utils/pillarStorage.js';
export default {
  data() {
    return {
      pillars: [],
      currentQuestion: 0,
    }
  },
  created() {
    this.pillars = pillarStorage.get();
    this.redirectIfCompleted();
  },
  methods: {
    redirectIfCompleted() {
      let completed = true;
      this.pillars.forEach((pillar) => {
        console.log(pillar.rating)
        if (pillar.rating === 0) {
          completed = false;
        }
      });

      if (completed) {
        this.$router.push({ path: '/results' })
      }
    },
    back() {
      if(this.currentQuestion > 0) {
        this.currentQuestion -= 1;
      }
    },
    next() {
      if (this.currentQuestion < this.pillars.length - 1) {
        this.currentQuestion += 1;
      } else {
        pillarStorage.set(this.pillars);
        this.$router.push({ path: '/results' })
      }
    }
  }
};
</script>

<style scoped lang="stylus">
  .main
    color gray

    .question-container
      min-width 30rem

      .form-check
        cursor pointer

</style>
