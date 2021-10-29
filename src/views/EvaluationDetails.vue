<template lang="pug">
  .container
    .row.mb-4
      .col-12
        router-link(to="/evaluations") ← Return to all evaluations
    .row.mb-4(v-if="evaluation")
      .col-12.col-md-4
        .grow-card
          .title-container.mb-4
            h3 Evaluation Details
          .bottom-container.d-flex.justify-content-between
            .left-container
              .text-container.d-flex.flex-column.justify-content-around
                p.mb-0 ID: {{ id }}
                p.mb-0 Created at: {{ formattedDate(evaluation.createdAt) }}
              .score-container.mt-5.d-flex.justify-content-center
                .text-container.d-flex.align-items-center.text-muted.mr-4.
                  Happiness score:
                .icon-container.text-center.d-flex.align-items-center(:class="`${this.ratingColorClass}`")
                  i.mr-2(:class="`${this.emoji}`")
                  p.mb-0 {{ evalAverageRating() }}
              .options-container.mt-5
                button.btn.btn-outline-danger(@click="deleteEvaluation()") Delete evaluation
      .col-12.col-md-8
        .grow-card
          h3.mb-3 Evaluation wheel chart
          Evaluation-Graph-Wheel(:evaluation="evaluation" :pillars="pillars")
    .row
      .col-12.mb-3(v-if="evaluation")
        .grow-card
          h3.mb-4 Pillar details
          table.table.table-striped
            thead
              tr
                th(scope='col') Pillar
                th(scope='col') Rating
                th(scope='col') Notes
            tbody
              tr(v-for="pillar in evaluation.pillars")
                th(scope='row') 
                  i.fa-xs(:class="getPillar(pillar.id).icon" :style="{ color: getPillar(pillar.id).color}")
                  span.ml-3 {{ getPillar(pillar.id).name }}
                td {{ pillar.rating }}
                td {{ pillar.notes }}
</template>

<script>
import EvaluationGraphWheel from '../components/EvaluationGraphWheel.vue';

import { formattedDate } from '../mixins/formattedDate.js';
import { evaluationMixin } from '../mixins/evaluationMixin.js';
import { dbMixin } from '../mixins/dbMixin.js';

export default {
  name: 'EvaluationDetails',
  components: { EvaluationGraphWheel },
  props: { userID: String },
  mixins: [formattedDate, evaluationMixin, dbMixin],
  data() {
    return {
      id: '',
      evaluation: undefined,
      pillars: []
    }
  },
  async mounted() {
    await this.getPillars();
    await this.getEvaluation();
    await this.computeRatingVisuals();
  },
  watch: {
    userID: async function() {
      await this.getEvaluation();
    }
  },
  methods: {
     async getEvaluation() {
      this.loading = true;

      this.id = this.$route.params.id

      const doc = await this.$db
        .collection('evaluations')
        .doc(this.id)
        .get()

      this.evaluation = doc.data();
      this.loading = false;
    },
    getPillar(id) {
      return this.pillars.find(pillar => pillar.id === id);
    },
    async deleteEvaluation() {
      const confirmDelete = confirm('Are you sure you want to delete this evaluation?');

      if (confirmDelete) {
        try {
          await this.$db.collection('evaluations').doc(this.id).delete();
          this.$router.push('/evaluations');
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  .container
    color black
    .score-container
        .text-container
          font-size 1rem
        .icon-container
          font-size 2rem
</style>
