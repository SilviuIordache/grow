<template lang="pug">
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
      pillarsData: [],
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
          // Calculate rating avg
          ratingSum += pillar.rating / pillars.length;

          // Add individual pillars data
            // check if pillar evaluation exists with this id
            let pillarIndex = this.pillarsData.findIndex((newPillarData) => {
              const result = newPillarData.id === pillar.id
              return result;
            });

            if (pillarIndex === -1) {
            // if it doesn't exist, create it
              this.pillarsData.push({
                id: pillar.id,
                ratings: [pillar.rating]
              });
            } else {
              // if it exists, add to the array
              this.pillarsData[pillarIndex].ratings.push(pillar.rating)
            }
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
        options: {
          scales: {
            xAxes: [{
              ticks: {
                display: false
              }
            }]
          },
          legend: false
        },
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
  .avg-rating
    color black
</style>
