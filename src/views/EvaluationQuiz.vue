<template lang="pug">
  .container
    .row(v-if="!this.pillars").
      Loading..
    .row(v-else)
      .col-12.d-flex.justify-content-center
        .question-container.grow-card
          .top-half
            h3.mb-3 Evaluation
            p {{ currentQuestion + 1}} / {{ pillars.length }}
            .title-container.d-flex.align-items-center.mb-3
              i.mr-2.fa-lg(:class="pillars[currentQuestion].icon" :style="{ color: pillars[currentQuestion].color}")
              h5.my-0(ref='el' :style="{ color: pillars[currentQuestion].color}") {{ pillars[currentQuestion].name }}
            
            #description-container {{ pillars[currentQuestion].description }}
            
            p On a scale from 0 to 10, how would you rate the pillar of {{ pillars[currentQuestion].name }}?
          .bottom-half.mt-5
            h3.mb-4.text-center {{ rating }}
            .form
              input.slider(type='range' min="0" max="10" step="0.5" v-model="rating" @click="sliderClick()")
              .numbers-container.mx-1.d-flex.justify-content-between
                span 0
                span 10
              h3.mb-4.text-center(:class="{ 'hidden': rated }") Rate this pillar
            .buttons-container.mt-4
              .nav-buttons.d-flex.justify-content-around
                //- button.btn.btn-primary.mr-4(:class="{ 'hidden': currentQuestion === 0}" @click="back()" ).
                //-   Back
                button.btn.btn-primary.btn-lg( role="button" type="button" @click="next()")
                  span(v-if="currentQuestion < pillars.length - 1") Next
                  span(v-else) Finish
</template>

<script>
import pillarStorage from '../utils/pillarStorage.js';
import firebase from 'firebase/app';

export default {
  props: { userID: String },
  data() {
    return {
      pillars: [],
      evaluation: [],
      currentQuestion: 0,
      rating: 5,
      rated: false
    }
  },
  created() {
    console.log(this.userID)
    this.pillars = pillarStorage.get();
  },
  methods: {
    redirectIfCompleted() {
      let completed = true;
      this.pillars.forEach((pillar) => {
        if (pillar.rating === 0) {
          completed = false;
        }
      });

      if (completed) {
        this.$router.push({ path: '/results' })
      }
    },
    back() {
      if(this.currentQuestion > 0) {
        this.currentQuestion -= 1;
      }
    },
    next() {
      // save each rating
      this.addPillarEvaluation();

      // when on last, save evaluation
      if (this.currentQuestion === this.pillars.length - 1) {
        this.saveEvaluation();
        this.$router.push('/evaluations');
      }

      this.currentQuestion += 1;
      this.rated = false;
    },
    addPillarEvaluation() {
      this.evaluation.push({
        name: this.pillars[this.currentQuestion].name,
        rating: this.rating,
      });
    },
    async saveEvaluation() {
      try {
        let createdDate = new Date();
        let fireStamp = new firebase.firestore.Timestamp.fromDate(createdDate);
        await this.$db.collection('evaluations').add({
          evaluation: this.evaluation,
          createdAt: fireStamp,
          ownerID: this.userID
        });
      } catch (err) {
        console.log(err)
      }
    },
    sliderClick() {
      this.rated = true;
    }
    
  }
};
</script>

<style scoped lang="stylus">
  .hidden
    visibility hidden
  .container

    .question-container
      width 45rem

      .form-check
        cursor pointer
      
      .slider
        -webkit-appearance none
        border-radius 1rem
        width 100%
        height 1.2rem
        background #d3d3d3
        outline none
        opacity 0.7
        -webkit-transition .2s
        transition opacity .2s
        &:hover
            opacity 1
        &::-webkit-slider-thumb
            border-radius 1rem
            -webkit-appearance none
            appearance none
            width 1.8rem
            height 1.8rem
            background #007bff
            cursor pointer
        &::-moz-range-thumb
            width 1.5rem
            height 1.5rem
            background #007bff
            cursor pointer

</style>
