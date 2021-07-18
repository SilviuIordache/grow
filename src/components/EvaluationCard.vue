<template lang="pug">
  .container.grow-card.grow-card-interactive.p-4(v-if="evaluation.pillars" @click="goToDetailedEvaluationView()")
    .row
      .col-6.mb-3
        p.mb-0 Evaluation Score
        .inner-container.avg-rating.d-flex.align-items-center(:class="`${this.ratingColorClass}`")
          i.mr-1(:class="`${this.emoji}`")
          p.mb-0 {{ evalAverageRating() }}
      .col-6
        p.mb-0 Date
        p.text-muted.mb-0.mt-2 {{ formattedDate(evaluation.createdAt) }}
    .row
      .col-12
        p Pillar scores
      .col-3.col-lg-1.pillar-score(v-for="pillar in evaluation.pillars" )
        .inner-container.d-flex.flex-column.align-items-center
          i.fa-xs(:class="getPillar(pillar.id).icon")
          p.text-muted {{ pillar.rating }}
</template>

<script>
import { formattedDate } from '../mixins/formattedDate.js';
import { evaluationMixin } from '../mixins/evaluationMixin.js';

export default {
  mixins: [formattedDate, evaluationMixin],
  props: {
    evaluation: Object,
    pillars: Array
  },
  async mounted() {
    this.computeRatingVisuals();
  },
  methods: {
    goToDetailedEvaluationView() {
      this.$router.push( {path: `/evaluations/${this.evaluation.id}`});
    },
    getPillar(id) {
      return this.pillars.find(pillar => pillar.id === id);
    }
  }
};
</script>

<style lang="stylus" scoped>
  .pillar-score
    width 2rem
</style>