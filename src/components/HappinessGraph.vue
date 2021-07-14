<template lang="pug">
  .row
    .col-12.col-lg-2(v-if="details")
      .happiness-checkbox
        input(type='checkbox')
        label.ml-2.mb-0 Happiness
      .pillar-checkbox-container(v-for="(pillar, index) in pillars")
        .option-container.d-flex.align-items-center.mt-4
          input(type='checkbox' :value="pillar.id" v-model="checkedPillars")
          label.ml-2.mb-0 {{ pillar.name }}
    .col-12.col-lg-10
      canvas#myChart(width="auto" height="auto")
</template>

<script>
import { formattedDate } from '../mixins/formattedDate.js';
import Chart from 'chart.js'
import { dbMixin } from '../mixins/dbMixin.js';

export default {
  mixins: [formattedDate, dbMixin],
  props: {
    details: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pillarsData: [],
      evalRatings: [],
      evalDates: [],
      checkedPillars: [],
      dummy: false,
      evaluations: [],
      loading: false,
      pillars: []
    }
  },
  async mounted() {
    await this.getAuthData();
    await this.getPillars();
    await this.getEvaluations();
    this.calculateChartData();
    this.calculateChartLabels();
    this.generateChart();
    this.setPillarsAsUnchecked();
  },
  methods: {
    setPillarsAsUnchecked() {
      this.pillars.forEach((pillar) => pillar.checked = true);
    },
    updatedGraphedPillars(index) {
      // console.log(this.pillars[index].checked);
      this.pillars[index].checked = !this.pillars[index].checked;
    },
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
