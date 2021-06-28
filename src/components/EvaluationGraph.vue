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
    evaluations: Array
  },
  mounted() {
    this.generateChart();
  },
  methods: {
    generateChart() {
      let ctx = document.getElementById('myChart');
      console.log(ctx)

      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45],
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
