<template lang="pug">
  .container
    .row.mb-3
      .col-12
        .grow-card
          h3.mb-3 New evaluation
          p Take a new evaluation quiz
          button.btn.btn-primary(@click="startNewEvaluation()") Start
    .grow-card
      .row
        .col-12.mb-4
          h3 Your evaluations
      .row(v-if="loading")
        .col-12.col-sm-3.mb-4.
            Loading...
      .row.cards(v-else)
        Evaluation-Card(v-for="evaluation in evaluations" :evaluation="evaluation")
</template>

<script>
import EvaluationCard from '../components/EvaluationCard.vue';

export default {
  components: { EvaluationCard },
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
  methods: {
    startNewEvaluation() {
      this.$router.push({ path: '/evaluationQuiz' })
    },
    async getEvaluations() {
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
    },
    
  },
};
</script>

