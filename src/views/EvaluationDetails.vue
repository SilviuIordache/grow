<template lang="pug">
  .container
    .row.mb-5
      .grow-card.col-12.d-flex.mb-3(v-if="evaluation")
        .score-container.avg-rating(:class="`${this.ratingColorClass}`")
          i(:class="`${this.emoji}`")
          p.mb-0 {{ evalAverageRating() }}
        .text-container.ml-4.d-flex.flex-column.justify-content-around
          p.mb-0 Evaluation id: {{ id }}
          p.mb-0 Created at: {{ formattedDate(evaluation.createdAt) }}
      .grow-card.col-12(v-if="evaluation")
        table.table
          thead
            tr
              th(scope='col') Pillar
              th(scope='col') Rating
              th(scope='col') Notes
          tbody
            tr(v-for="pillar in evaluation.pillars")
              th(scope='row') 
                i.fa-xs(:class="pillar.icon")
                span.ml-3 {{ pillar.name }}
              td {{ pillar.rating }}
              td {{ pillar.notes }}

        //- .grow-card.pillar-score.d-flex.mb-2.px-5.py-2(v-for="pillar in evaluation.pillars")
        //-   .pillar-score
        //-     p.text-muted {{ pillar.rating }}
        //-   .pillar-computeRatingVisuals
        //-     i.fa-xs(:class="pillar.icon")
        //-     p {{ pillar.name}}
</template>

<script>
import { formattedDate } from '../mixins/formattedDate.js';
import { evaluationMixin } from '../mixins/evaluationMixin.js';

export default {
  props: { userID: String },
  mixins: [formattedDate, evaluationMixin],
  data() {
    return {
      id: '',
      evaluation: undefined
    }
  },
  async mounted() {
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
  }
};
</script>

<style lang="stylus" scoped>
  .container
    color black
</style>
