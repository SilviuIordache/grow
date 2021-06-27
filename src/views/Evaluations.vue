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
      .row
        .col-12.col-sm-3.mb-4(v-if="evaluations.length > 0" v-for="evaluation in evaluations")
          .grow-card.p-3
            p {{ formattedDate(evaluation.createdAt) }}
            p.text-primary Average rating {{ evalAverageRating(evaluation.evaluation) }}
</template>

<script>
import { formattedDate } from '../mixins/formattedDate.js'

export default {
  mixins: [formattedDate],
  props: { userID: String },
  data() {
    return {
      evaluations: []
    }
  },
  async mounted() {
    await this.getEvaluations();

    this.evalAverageRating();
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
    evalAverageRating(evaluation) {
      if (evaluation) {
        let ratingSum = 0;
        evaluation.forEach((pillar) => {
          ratingSum += parseInt(pillar.rating, 10);
        });

        const avg = ratingSum/ evaluation.length;
        return avg
      }
    }
  },
};
</script>

<style scoped lang="stylus">
  .ceva
    color black
</style>
