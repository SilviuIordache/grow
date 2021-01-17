<template lang="pug">
  .main.container
    .row
      .col-12.d-flex.justify-content-center
        .results-container
          .chart-container
            canvas#resultsChart(width="600" height="600")
          .pillars-to-improve
            p For a happier life, these are the areas to improve:
            p(v-for="pillar in improvePillars") {{ pillar.name }}: {{ pillar.rating}}/10
          .restart-container
            button.btn.btn-primary(role="button" type="button" @click="restart()") Restart
</template>

<script>
import Chart from 'chart.js';

export default {
  data() {
    return {
      pillars: [],
      improvePillars: [],
    }
  },
  mounted() {
    this.getPillars();
    this.generateChart();
    this.generateImprovePillars();
  },
  methods: {
    getPillars() {
      this.pillars = JSON.parse(localStorage.getItem('pillars'));
    },
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
      this.$router.push('/evaluation')
    }
  }
};
</script>

<style scoped lang="stylus">
  .main
    color gray
</style>
