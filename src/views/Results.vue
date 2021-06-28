<template lang="pug">
  .container
    .grow-card
      .row.mb-3
        .col-12.d-flex.justify-content-center
          #summary-container
            .pillars-to-improve
              h3 Summary
              p Like an out of balance wheel, life can also grow out of balance when some areas are lacking.
              p For a happier life, these are the pillars to improve:
        
      .row
        .col-12.col-sm-4.col-md-3.mb-3.mb-sm-0(v-for="pillar in improvePillars")
          .grow-card.p-3
            p.mb-1(:style="{ color: pillar.color}") {{ pillar.name }}
            p.mb-1 {{ pillar.rating}} / 10
      .row
        .col-12
          .restart-container.d-flex.justify-content-start.mt-4
            button.btn.btn-outline-success.d-block.mb-2.mr-4(role="button" type="button" @click="restart()") Restart
            //- button.btn.btn-outline-warning.d-block.mb-2(role="button" type="button" @click="edit()") Edit current Evaluation
            button.btn.btn-primary.s.d-block.mb-2(role="button" type="button" @click="goToGoals()") Set goals
    .row
      .col-12.mt-3.d-flex.justify-content-center
        #chart-container.grow-card
          h3.mb-5 Evaluation results
          .chart-container
            canvas#resultsChart(width="auto" height="auto")
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
      let chartColors = this.pillars.map((elem) => {
        const colorChannels = elem.color.split('(')[1].slice(0, -1).split(',');
        const r = colorChannels[0].trim();
        const g = colorChannels[1].trim();
        const b = colorChannels[2].trim();
        const alpha = 0.3
        return `rgba(${r}, ${g}, ${b}, ${alpha}`
      });

      let chart = new Chart(ctx, {
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
  #summary-container, #chart-container
    width 100%
</style>
