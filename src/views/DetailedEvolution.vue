<template lang="pug">
  .container
    .grow-card
      h3.mb-5 Happiness & Pillars evolution
      .row
        .col-2
          .happiness-checkbox
            input(type='checkbox' checked)
            label.ml-2 Happiness
          .pillar-checkbox-container(v-for="pillar in pillars")
            input(type='checkbox' @click="pillar.checked = !pillar.checked")
            label.ml-2 {{ pillar.name }}
        .col-10
          Happiness-Graph.mb-4(:evaluations="evaluations")
</template>

<script>
import HappinessGraph from '../components/HappinessGraph.vue';

import { dbMixin } from '../mixins/dbMixin.js';

export default {
  mixins: [dbMixin],
  props: { userID: String },
  components: { HappinessGraph },
  data() {
    return {
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
      this.pillars.forEach((pillar) => pillar.checked = false);
    }
  },
};
</script>

