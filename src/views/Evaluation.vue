<template lang="pug">
  .main.container
    .row
      .col-12.d-flex.justify-content-center
        .results-container(v-if="showResults")
            span Results
            div(v-for="index in pillars.length")
              span {{ pillars[index - 1].name }}: 
              span {{ pillars[index - 1].rating }}
        .question-container.mt-5(v-else)
          p {{ currentQuestion + 1}} / {{ this.pillars.length }}
          p On a scale from 1 to 10, how would you rate your {{ pillars[currentQuestion].name }}?
          .form
            .form-check.form-check-inline(v-for="index in pillars.length" :key="index")
              input.form-check-input(type='radio' :value="index" v-model="pillars[currentQuestion].rating")
              label.form-check-label(for='inlineRadio1') {{ index }}
          .buttons-container.mt-4
            .nav-buttons
              button.btn.btn-primary.mr-4(@click="back()" v-if="currentQuestion > 0") Back
              button.btn.btn-primary(@click="next()" :disabled="!pillars[currentQuestion].rating")
                span(v-if="currentQuestion < pillars.length - 1") Next
                span(v-else) Show Results

          .answer-container.mt-4.
            You selected {{ pillars[currentQuestion].rating }}

          
          
</template>

<script>
export default {
  methods: {
  },
  data() {
    return {
      pillars: [
        { name: 'Love', rating: 0 },
        { name: 'Finances', rating: 0 },
        { name: 'Relationships', rating: 0 },
        { name: 'Career', rating: 0 },
        { name: 'Hobbies/Fun', rating: 0 },
        { name: 'Health', rating: 0 },
        { name: 'Mind', rating: 0 },
        { name: 'Purpose', rating: 0 },
      ],
      currentQuestion: 0,
      showResults: false
    }
  },
  methods: {
    back() {
      if(this.currentQuestion > 0) {
        this.currentQuestion -= 1;
      }
    },
    next() {
      if (this.currentQuestion < this.pillars.length - 1) {
        this.currentQuestion += 1;
      } else {
        this.showResults = true;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
  .main
    color gray
</style>
