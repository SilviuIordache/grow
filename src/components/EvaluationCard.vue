<template lang="pug">
  .col-12.col-lg-6.mb-4(@click="goToDetailedEvaluationView()")
    .evaluation-card.grow-card.grow-card-interactive.d-flex.justify-content-between.p-4
      .left-container
        .pillar-scores-container.d-flex
          .pillar-score.mr-3.mr-md-4(v-for="pillar in evaluation.pillars")
            i.fa-xs(:class="pillar.icon")
            p.text-muted {{ pillar.rating }}
        p.text-muted.mb-0 {{ formattedDate(evaluation.createdAt) }}
      .right-container.d-flex.align-items-center
        .inner-container.avg-rating(:class="`${this.ratingColorClass}`")
          i(:class="`${this.emoji}`")
          p.mb-0 {{ evalAverageRating() }}
</template>

<script>
import { formattedDate } from '../mixins/formattedDate.js';
import { evaluationMixin } from '../mixins/evaluationMixin.js';

export default {
  mixins: [formattedDate, evaluationMixin],
  props: {
    evaluation: Object
  },
  mounted() {
    this.computeRatingVisuals();
  },
  methods: {
    goToDetailedEvaluationView() {
      this.$router.push( {path: `/evaluations/${this.evaluation.id}`});
    }
  }
};
</script>