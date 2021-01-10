<template lang="pug">
  .main.container
    .row
      .col-12.d-flex.justify-content-center

        .question-container.mt-5(v-if="!showResults")
          p {{ currentQuestion + 1}} / {{ pillars.length }}
          p On a scale from 1 to 10, how would you rate your {{ pillars[currentQuestion].name }}?
          .form
            .form-check.form-check-inline(v-for="index in 10" :key="index")
              input.form-check-input(type='radio' :value="index" v-model="pillars[currentQuestion].rating")
              label.form-check-label(for='inlineRadio1') {{ index }}
          .buttons-container.mt-4
            .nav-buttons
              button.btn.btn-primary.mr-4(v-if="currentQuestion > 0"   @click="back()" ).
                Back
              button.btn.btn-primary(role="button" type="button" @click="next()" :disabled="!pillars[currentQuestion].rating")
                span(v-if="currentQuestion < pillars.length - 1") Next
                span(v-else) Show Results

          .answer-container.mt-4.
            You selected {{ pillars[currentQuestion].rating }}
        .results-container(v-else)
          .chart-container
            canvas#resultsChart(width="600" height="600")
          .pillars-to-improve
            p The areas you should work to improve are:
            p(v-for="pillar in improvePillars") {{ pillar.name }}: {{ pillar.rating}}/10

</template>

<script>
import Chart from 'chart.js';

export default {
  methods: {
  },
  data() {
    return {
      pillars: [
        { 
          name: 'Love',
          rating: 0,
          color: 'rgba(255, 99, 132, 0.2)'
        },
        {
          name: 'Finances',
          rating: 0,
          color: 'rgba(75, 192, 192, 0.2)'
        },
        {
          name: 'Relationships',
          rating: 0,
          color: 'rgba(255, 201, 54, 0.2)'
        },
        {
          name: 'Career',
          rating: 0,
          color: 'rgba(31, 143, 255, 0.2)'
        },
        {
          name: 'Hobbies/Fun',
          rating: 0,
          color: 'rgba(205, 130, 255, 0.2)'
        },
        {
          name: 'Health',
          rating: 0,
          color: 'rgba(97, 232, 102, 0.2)'
        },
        {
          name: 'Mind',
          rating: 0,
          color: 'rgba(72, 232, 224, 0.2)'
        },
        {
          name: 'Purpose',
          rating: 0,
          color: 'rgba(232, 136, 72, 0.2)'
        },
      ],
      improvePillars: [],
      currentQuestion: 0,
      showResults: false,
    }
  },
  methods: {
    generateChart() {
      let ctx = document.getElementById('resultsChart');
  
      let chartValues = this.pillars.map((elem) => elem.rating);
      let chartLabels = this.pillars.map((elem) => elem.name);
      let chartColors = this.pillars.map((elem) => elem.color);
      let myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: chartLabels,
          datasets: [{
            data: chartValues,
            backgroundColor: chartColors,
          }],
        }
      })
    },
    generateImprovePillars() {
      let sortedArray = this.pillars.sort((a, b) => a.rating - b.rating );

      this.improvePillars = sortedArray.slice(0, 3);
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
        this.showResults = true;
        setTimeout(() => { this.generateChart() }, 0);
        this.generateImprovePillars();
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
</style>
