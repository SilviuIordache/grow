<template lang="pug">
  .container
    .grow-card
      h3.mb-5 Happiness & Pillars evolution
      .row
        .col-12.col-lg-2
          .happiness-checkbox
            input(type='checkbox')
            label.ml-2.mb-0 Happiness
          .pillar-checkbox-container(v-for="(pillar, index) in pillars")
            .option-container.d-flex.align-items-center.mt-4
              input(type='checkbox' :value="pillar.id" v-model="checkedPillars")
              label.ml-2.mb-0 {{ pillar.name }}
        .col-12.col-lg-10
          Happiness-Graph.mb-4(:evaluations="evaluations")
</template>

<script>
import HappinessGraph from '../components/HappinessGraph.vue';

import { dbMixin } from '../mixins/dbMixin.js';

export default {
  name: 'DetailedEvolution',
  mixins: [dbMixin],
  props: { userID: String },
  components: { HappinessGraph },
  data() {
    return {
      checkedPillars: [],
      dummy: false,
      evaluations: [],
      loading: false,
      pillars: []
    }
  },
  async mounted() {
    await this.getPillars();
    await this.getEvaluations();
    this.setPillarsAsUnchecked();
  },
  methods: {
    setPillarsAsUnchecked() {
      this.pillars.forEach((pillar) => pillar.checked = true);
    },
    updatedGraphedPillars(index) {
      // console.log(this.pillars[index].checked);
      this.pillars[index].checked = !this.pillars[index].checked;
    }
  },
};
</script>

