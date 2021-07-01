<template lang="pug">
  .col-12.col-lg-6.mb-4(@click="goToDetailedEvaluationView()")
    .evaluation-card.grow-card.grow-card-interactive.d-flex.justify-content-between.p-4
      .left-container
        .pillar-scores-container.d-flex
          .pillar-score.mr-3.mr-md-4(v-for="pillar in evaluation.pillars")
            i.fa-xs(:class="pillar.icon")
            p.text-muted {{ pillar.rating }}
        p.text-muted.mb-0 {{ formattedDate(evaluation.createdAt) }}
      .right-container.d-flex.align-items-center.avg-rating
        .inner-container.text-center(:class="`${this.ratingColorClass}`")
          i(:class="`${this.emoji}`")
          p.mb-0 {{ evalAverageRating() }}
</template>

<script>
import { formattedDate } from '../mixins/formattedDate.js';

export default {
  mixins: [formattedDate],
  props: {
    evaluation: Object
  },
  data() {
    return {
      ratingColorClass: 'rating-color-3',
      emoji: 'fa-meh'
    }
  },
  mounted() {
    this.computeRatingVisuals();
  },
  methods: {
    evalAverageRating() {
      if (this.evaluation.pillars) {
        let ratingSum = 0;
        this.evaluation.pillars.forEach((pillar) => {
          ratingSum += parseInt(pillar.rating, 10);
        });

        const avg = ratingSum/ this.evaluation.pillars.length;
        return avg.toFixed(1)
      }
    },
    computeRatingVisuals() {
      const value = this.evalAverageRating();
      if (value <= 2.5) {
        this.ratingColorClass = 'rating-color-1';
        this.emoji = 'far fa-frown';
        return
      }

      if (value > 2.5 && value <= 5) {
        this.ratingColorClass = 'rating-color-2';
        this.emoji = 'far fa-meh';
        return
      }

      if (value > 5 && value <= 7.5) {
        this.ratingColorClass = 'rating-color-3';
        this.emoji = 'far fa-smile';
        return
      }

      if (value > 7.5 && value <= 10) {
        this.ratingColorClass = 'rating-color-4';
        this.emoji = 'far fa-laugh';
        return
      }
      
    },
    goToDetailedEvaluationView() {
      this.$router.push( {path: `/evaluations/${this.evaluation.id}`});
    }
  }
};
</script>

<style lang="stylus" scoped>

  .avg-rating
    font-size 2rem
  .rating-color-1
    color #fc3903
  .rating-color-2
    color #fc6f03
  .rating-color-3
    color #fcbe03
  .rating-color-4
    color #12c78e

</style>
