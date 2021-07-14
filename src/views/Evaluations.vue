<template lang="pug">
  .container
    .row.mb-3
      .col-12.col-md-4
        .grow-card.mb-3.d-flex.flex-column.justify-content-between
          .top-container
            h3.mb-3 New evaluation
            p Take a new evaluation quiz
          button.btn.btn-primary.py-3(@click="startNewEvaluation()") START NEW EVALUATION
      .col-12.col-md-8
        .grow-card
          h3.mb-3 Happiness evolution
          Happiness-Graph.mb-4(:evaluations="evaluations")
          .detailed-link-container.text-right
            router-link(to="/detailedEvolution") View detailed →
        
    .grow-card.mb-3
      .row
        .col-12.mb-4
          h3 Your evaluations
      .row(v-if="loading")
        .col-12.col-sm-3.mb-4.
            Loading...
      .row.cards(v-else)
        .col-12.empty-text(v-if="evaluations.length === 0").
          You don't have any evaluations yet. Take a new quiz to create your first.
        .col-12.col-lg-6.mb-4(v-else v-for="evaluation in evaluations" )
          Evaluation-Card(:evaluation="evaluation" :pillars="pillars")
        
</template>

<script>
import EvaluationCard from '../components/EvaluationCard.vue';
import HappinessGraph from '../components/HappinessGraph.vue';

import { dbMixin } from '../mixins/dbMixin.js';

export default {
  name: 'Evaluations',
  mixins: [dbMixin],
  components: { EvaluationCard, HappinessGraph },
  props: { userID: String },
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
  },
  methods: {
    startNewEvaluation() {
      this.$router.push({ path: '/evaluationQuiz' })
    }
  },
};
</script>

