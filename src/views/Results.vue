<template lang="pug">
  .main.container
    .row.mb-5
      .col-12.col-lg-7.d-flex.justify-content-center
        .results-container
          .chart-container
            canvas#resultsChart(width="600" height="600")
      .col-12.col-lg-5.px-4.border-left
        .pillars-to-improve
          p Like an out of balance wheel, life can also grow out of balance when some areas are lacking.
          p For a happier life, these are the areas to improve:
          p(v-for="pillar in improvePillars") {{ pillar.name }}: {{ pillar.rating}}/10
        .restart-container
          button.btn.btn-outline-success.d-block.mb-2(role="button" type="button" @click="restart()") Restart Evaluation
          button.btn.btn-outline-warning.d-block.mb-2(role="button" type="button" @click="edit()") Edit current Evaluation
          button.btn.btn-primary.s.d-block.mb-2(role="button" type="button" @click="goToGoals()") Set Goals for lacking areas 
</template>

<script>
import Chart from 'chart.js';
import pillarStorage from '../utils/pillarStorage.js';

export default {
  data() {
    return {
      pillars: [],
      improvePillars: [],
    }
  },
  created() {
    this.pillars = pillarStorage.get();
  },
  mounted() {
    this.generateChart();
    this.generateImprovePillars();
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
    restart() {
      pillarStorage.wipe();
      this.$router.push('/evaluation')
    },
    edit() {
      this.$router.push('/evaluation')
    },
    goToGoals() {
      this.$router.push('/goals')
    }
  }
};
</script>

<style scoped lang="stylus">
  .main
    color gray
</style>
