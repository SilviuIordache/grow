<template lang="pug">
  .container.grow-card
    .row
      .col-12
        h1.mb-4 Grow 
        span Grow is a tool for evaluating your key life-areas. You do this through a quick 1-min quiz. A way to evaluate and visualize your life-pillars is through a Wheel-of-Life evaluation tool.

        p.mt-2 It's said that a happy life is a balanced life. A person is happy when the pillars of life are in balance. When the wheel is full, life is rolls fluidly, we can say we are happy.
        
        p Similarly, when some areas aren't doing so great, the wheel of life starts to roll out of balance, taking a toll on hapiness, which is at it's core.

        p The main life pillars are:
          
    .row(v-if="loading")
      .col-12.text-center
        .spinner-border.text-primary(role='status')
          span.sr-only Loading...

    .row(v-else)
      .col-12.col-sm-6.col-md-4.col-lg-3.my-3(v-for="pillar in pillars")
        .grow-card.p-4
          i.mr-2.fa-lg(:class="pillar.icon" :style="{ color: pillar.color}")
          span {{ pillar.name }}
    .row
      .col-12
        .evaluation-container.mt-5.text-center
          button.btn.btn-primary.btn-lg(v-if="loggedIn" role="button" type="button" @click="startEvaluation()").
            Start evaluation
          .unlogged-actions-container(v-else)
            button.btn.btn-primary.btn-lg(role="button" type="button" @click="goToRegister()").
              Register/Login to create evaluations
            p or
            button.btn.btn-light.btn-lg(role="button" type="button" @click="loginWithDemo()").
              View DemoAccount
    .row.mt-5
      .col-12.d-flex.justify-content-center
        .d-block
          router-link(to="/pillars") Read more about the pillars of life
</template>

<script>
import { dbMixin }  from '../mixins/dbMixin.js';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Home',
  mixins: [dbMixin],
  props: {
    loggedIn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pillars: [],
      loading: false
    }
  },
  async created() {
    await this.getPillars();
  },
  methods: {
    startEvaluation() {
      this.$router.push({ path: '/evaluationQuiz' })
    },
    goToRegister() {
      this.$router.push({ path: '/register' })
    },
    async loginWithDemo() {
      try {
        await firebase.auth().signInWithEmailAndPassword('demo@growhappy.com', '123456');
        this.$router.push('/');
      } catch (err) {
        this.error = err.message;
        console.log(err);
      }
    }
  }
};
</script>

<style scoped lang="stylus">
  .main
    color gray
</style>
