<template lang="pug">
  .container
    .row.mb-4
      .col-12
        router-link(to="/evaluations") ← Return to all evaluations
    .row.mb-4(v-if="evaluation")
      .col-12.col-md-4
        .grow-card
          .title-container.mb-4
            h3 Evaluation details
          .bottom-container.d-flex.justify-content-between
            .left-container
              .text-container.d-flex.flex-column.justify-content-around
                p.mb-0 ID: {{ id }}
                p.mb-0 Created at: {{ formattedDate(evaluation.createdAt) }}
              .score-container.avg-rating.mt-4(:class="`${this.ratingColorClass}`")
                i(:class="`${this.emoji}`")
                p.mb-0 {{ evalAverageRating() }}
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
                  i.fa-xs(:class="getPillar(pillar.pillarId).icon" :style="{ color: getPillar(pillar.pillarId).color}")
                  span.ml-3 {{ getPillar(pillar.pillarId).name }}
                td {{ pillar.rating }}
                td {{ pillar.notes }}
</template>

<script>
import EvaluationGraphWheel from '../components/EvaluationGraphWheel.vue';

import { formattedDate } from '../mixins/formattedDate.js';
import { evaluationMixin } from '../mixins/evaluationMixin.js';
import { dbMixin } from '../mixins/dbMixin.js';

export default {
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
    }
  }
};
</script>

<style lang="stylus" scoped>
  .container
    color black
    .score-container
      font-size 3rem
</style>
