<template lang="pug">
  #chart-container
    canvas#chart(width="auto" height="auto")
</template>

<script>
import Chart from 'chart.js';

export default {
  props: { 
    evaluation: Object, 
    pillars: Array
  },
  watch: {
    evaluation: function () {
      this.generateChart();
    }
  },
  mounted() {
     this.generateChart();
  },
  methods: {
    calculateChartData() {
      
    },
    generateChart() {
      let ctx = document.getElementById('chart');
  
      let chartValues = this.evaluation.pillars.map((elem) => elem.rating);
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
        },
        options: {
          legend: {
            position: 'right'
          },
        }
      })
    },
  }
};
</script>
