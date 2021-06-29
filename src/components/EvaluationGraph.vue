<template lang="pug">
  .grow-card
    .row
      .col-12
          h3 Happiness evolution
    .row
      .col-12
        .chart-container
          canvas#myChart(width="auto" height="auto")

</template>

<script>
import { formattedDate } from '../mixins/formattedDate.js';
import Chart from 'chart.js'

export default {
  mixins: [formattedDate],
  props: {
    evaluations: Array,
  },
  data() {
    return {
      evalRatings: [],
      evalDates: []
    }
  },
  watch: {
    evaluations: function () {
      this.calculateChartData();
      this.calculateChartLabels();
      this.generateChart();
    }
  },
  methods: {
    calculateChartData() {
      for (let i = 0; i < this.evaluations.length; i++) {
        let ratingSum = 0;

        const pillars = this.evaluations[i].pillars
        pillars.forEach((pillar) => {
          const avg = parseInt(pillar.rating, 10)
          ratingSum += avg / pillars.length;
        });
        this.evalRatings.push(ratingSum.toFixed(1));
      }
      this.evalRatings.reverse();
    },
    calculateChartLabels() {
      for (let i = 0; i < this.evaluations.length; i++) {
        const date = this.formattedDate(this.evaluations[i].createdAt);
        this.evalDates.push(date);
      }
      this.evalDates.reverse();
    },
    generateChart() {
      let ctx = document.getElementById('myChart');
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: this.evalDates,
            datasets: [{
                label: 'Happiness',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: this.evalRatings,
                fill: false
            }]
        },
        // Configuration options go here
        options: {}

      });
    }
  }
}
</script>

<style lang="stylus" scoped>
  .avg-rating
    color black
</style>
