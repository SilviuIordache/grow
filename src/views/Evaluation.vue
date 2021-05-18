<template lang="pug">
  .main.container
    .row(v-if="!this.pillars").
      Loading..
    .row(v-else)
      .col-12.d-flex.justify-content-center
        .question-container
          #name-container(ref='el' :style="{ color: pillars[currentQuestion].color}") {{ pillars[currentQuestion].name }}
          p {{ currentQuestion + 1}} / {{ pillars.length }}
          p On a scale from 1 to 10, how would you rate your {{ pillars[currentQuestion].name }}?
          .d-flex.justify-content-center
            h3.mb-4 {{ pillars[currentQuestion].rating}}
          .form
            input.slider(type='range' min="1" max="10" step="0.5" v-model="pillars[currentQuestion].rating")
            .numbers-container.mx-1.d-flex.justify-content-between
              span 1
              span 10
          .buttons-container.mt-4
            .nav-buttons.d-flex.justify-content-around
              button.btn.btn-primary.mr-4(:class="{ 'hidden': currentQuestion === 0}" @click="back()" ).
                Back
              button.btn.btn-primary(role="button" type="button" @click="next()" :disabled="!pillars[currentQuestion].rating")
                span(v-if="currentQuestion < pillars.length - 1") Next
                span(v-else) Finish
          .answer-container.mt-4
            p(v-if="pillars[currentQuestion].rating === 0") Rate this area to continue
            p(v-else) You rated {{ pillars[currentQuestion].name}} with {{ pillars[currentQuestion].rating }}/10
</template>

<script>
import pillarStorage from '../utils/pillarStorage.js';
export default {
  data() {
    return {
      pillars: [],
      currentQuestion: 0,
    }
  },
  created() {
    this.pillars = pillarStorage.get();
  },
  methods: {
    redirectIfCompleted() {
      let completed = true;
      this.pillars.forEach((pillar) => {
        console.log(pillar.rating)
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
      if (this.currentQuestion < this.pillars.length - 1) {
        this.currentQuestion += 1;
      } else {
        pillarStorage.set(this.pillars);
        this.$router.push({ path: '/results' })
      }
    },
    setListColor() {
      const elem = this.$refs.el;
      elem.style.color = this.pillars[this.currentQuestion].color;
    },
  }
};
</script>

<style scoped lang="stylus">
  .hidden
    visibility hidden
  .main
    color gray

    .question-container
      min-width 30rem

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
            background #04AA6D
            cursor pointer
        &::-moz-range-thumb
            width 1.5rem
            height 1.5rem
            background #04AA6D
            cursor pointer

</style>
