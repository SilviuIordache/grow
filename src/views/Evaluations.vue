<template lang="pug">
  .container
    .grow-card.mb-3
      .row
        .col-12
          h3.mb-3 New evaluation
          p Take a new evaluation quiz
          button.btn.btn-primary(@click="startNewEvaluation()") Start
    .grow-card.mb-3
      .row
        .col-12.mb-4
          h3 Your evaluations
      .row(v-if="loading")
        .col-12.col-sm-3.mb-4.
            Loading...
      .row.cards(v-else)
        Evaluation-Card(v-for="evaluation in evaluations" :evaluation="evaluation")
    Evaluation-Graph(:evaluations="evaluations")
</template>

<script>
import EvaluationCard from '../components/EvaluationCard.vue';
import EvaluationGraph from '../components/EvaluationGraph.vue';

export default {
  components: { EvaluationCard, EvaluationGraph },
  props: { userID: String },
  data() {
    return {
      evaluations: [],
      loading: false,
    }
  },
  async mounted() {
    await this.getEvaluations();
  },
  watch: {
    userID: async function() {
      await this.getEvaluations();
    }
  },
  methods: {
    startNewEvaluation() {
      this.$router.push({ path: '/evaluationQuiz' })
    },
    async getEvaluations() {
      this.loading = true;

      this.evaluations = [];
      const docRef = await this.$db
        .collection('evaluations')
        .where('ownerID', '==', this.userID)
        .orderBy("createdAt", 'desc');

      const snapshot = await docRef.get();

      snapshot.forEach(doc => {
        let evaluation = {};
        evaluation = doc.data();
        evaluation.id = doc.id;

        this.evaluations.push(evaluation);
      });

      this.loading = false;
    },
    
  },
};
</script>

