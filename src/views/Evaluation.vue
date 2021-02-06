<template lang="pug">
  .main.container
    .row
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
              button.btn.btn-primary.mr-4(v-if="currentQuestion > 0"   @click="back()" ).
                Back
              button.btn.btn-primary(role="button" type="button" @click="next()" :disabled="!pillars[currentQuestion].rating")
                span(v-if="currentQuestion < pillars.length - 1") Next
                span(v-else) Show Results
          .answer-container.mt-4
            p(v-if="pillars[currentQuestion].rating === 0") Rate this area to continue
            p(v-else) You rated {{ pillars[currentQuestion].name}} with {{ pillars[currentQuestion].rating }}/10
</template>

<script>
export default {
  data() {
    return {
      pillars: [
        { 
          name: 'Love',
          rating: 0,
          color: 'rgba(255, 99, 132, 0.2)',
          goals: []
        },
        {
          name: 'Finances',
          rating: 0,
          color: 'rgba(75, 192, 192, 0.2)',
          goals: []
        },
        {
          name: 'Relationships',
          rating: 0,
          color: 'rgba(255, 201, 54, 0.2)',
          goals: []
        },
        {
          name: 'Career',
          rating: 0,
          color: 'rgba(31, 143, 255, 0.2)',
          goals: []
        },
        {
          name: 'Hobbies/Fun',
          rating: 0,
          color: 'rgba(205, 130, 255, 0.2)',
          goals: []
        },
        {
          name: 'Health',
          rating: 0,
          color: 'rgba(97, 232, 102, 0.2)',
          goals: []
        },
        {
          name: 'Mind',
          rating: 0,
          color: 'rgba(72, 232, 224, 0.2)',
          goals: []
        },
        {
          name: 'Purpose',
          rating: 0,
          color: 'rgba(232, 136, 72, 0.2)',
          goals: []
        },
      ],
      currentQuestion: 0,
    }
  },
  mounted() {
    this.redirectIfCompleted();
  },
  methods: {
    redirectIfCompleted() {
      const storedResults = JSON.parse(localStorage.getItem('pillars'));

      if (storedResults) {
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
        localStorage.setItem('pillars', JSON.stringify(this.pillars));
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
