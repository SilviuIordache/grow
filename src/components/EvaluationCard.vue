<template lang="pug">
  .evaluation-card.grow-card.grow-card-interactive.d-flex.justify-content-between.p-4(v-if="evaluation.pillars" @click="goToDetailedEvaluationView()")
    .left-container
      .pillar-scores-container.d-flex
        .pillar-score.mr-3.mr-md-4(v-for="pillar in evaluation.pillars" )
          .inner-container(:class="")
            i.fa-xs(:class="getPillar(pillar.id).icon")
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