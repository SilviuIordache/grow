<template lang="pug">
  .row
    .col-12.col-lg-2(v-if="details")
      .happiness-checkbox
        input(type='checkbox' checked)
        label.ml-2.mb-0 Happiness
      .pillar-checkbox-container(v-for="(pillar, index) in pillars")
        .option-container.d-flex.align-items-center.mt-4
          input(type='checkbox' :value="pillar" v-model="checkedPillars" @click="toggleDataSet(pillar)")
          label.ml-2.mb-0(:style="{ color: pillar.color}") {{ pillar.name }}
      .buttons-container.mt-5
        button.btn.btn-outline-danger(@click="removeGraphData()") Toggle pillars off
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
      chart: {},
      pillarsData: [],
      evalRatings: [],
      evalDates: [],
      checkedPillars: [],
      dummy: false,
      evaluations: [],
      loading: false,
      pillars: [],
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
      this.chart = new Chart(ctx, {
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
    },
    toggleDataSet(pillar) {
      const data = this.pillarsData.find(data => data.id === pillar.id);
      if (this.checkedPillars.some(checkedPillar => checkedPillar.id === pillar.id)) {
        this.removeData(pillar)
      } else {
        this.addData(pillar, data); 
      }
    },
    addData(pillar, data) {
      this.chart.data.datasets.push({
        id: pillar.id,
        backgroundColor: pillar.color,
        borderColor: pillar.color,
        data: data.ratings,
        fill: false
      });
      this.chart.update();
    },
    removeData(pillar) {
      const index = this.chart.data.datasets.findIndex( data => data.id === pillar.id)

      this.chart.data.datasets.splice(index, 1)

      this.chart.update();
    },
    removeGraphData() {
      this.chart.data.datasets = [{
        label: 'Happiness',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: this.evalRatings,
        fill: false
      }];
      this.chart.update();
    }
  }
}
</script>

<style lang="stylus" scoped>
  .avg-rating
    color black
</style>
