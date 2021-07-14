<template lang="pug">
  .container
    .row.mb-4
      .col-12
        .grow-card.d-flex
          h1 Set goals for
          select.d-inline#goal-category.ml-3(required v-model="pillarCategory" @change="getGoals()")
            option(value="")  --- choose a pillar ---
            option(v-for="pillar in pillars" :value="pillar.name") {{ pillar.name }}
          i.ml-4.fa-3x(v-if="pillars.length > 0" :class="pillars[selectedPillar].icon" :style="{ color: pillars[selectedPillar].color}")

    .row
      .col-12.col-md-6
        .grow-card
          h2.mb-4 Add new goal
          form(method="POST"  @submit.prevent="")
            .form-group
              textarea#goal-description.form-control.mb-4(required type='text' name='goal' placeholder="Goal description" v-model="goalDescription")
            .form-group.mt-4
              button.btn.btn-primary(type="submit" name="submit" @click="addGoal()") Add goal
              span.ml-3.text-info(v-if="goalAddedSuccessfully") Goal added successfully
      .col-12.col-md-6
        .grow-card
          h2.mb-5 Your goals ({{ goals.length}})
          .loading-container.d-flex.justify-content-center(v-if="loading")
            .spinner-border.text-primary
          .goals-container(v-else)
            .no-goals-container(v-if="goals.length === 0").
              No goals created yet for this category
            .goals-inner-container(v-else)
              List-Item(v-for='goal in goals' :goal="goal")

</template>

<script>
import ListItem from '../components/ListItem.vue';
import { dbMixin } from '../mixins/dbMixin.js';

import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Goals',
  mixins: [dbMixin],
  components:{ ListItem },
  props: {
    userID: String
  },
  data() {
    return {
      pillars: [],
      selectedPillar: 0,
      pillarCategory: 'Love',
      goalDescription: '',
      goals: [],
      goalAddedSuccessfully: false,
      loading: false
    }
  },
  async created() {
    await this.getPillars();
    await this.getGoals();

    this.$on('goal:deleted', () => {
      this.getGoals();
    });

    this.$on('goal:updated', () => {
      this.getGoals();
    });
  },
  watch: {
    pillarCategory: function(val) {
      this.selectedPillar = this.pillars.findIndex((pillar) => pillar.name === this.pillarCategory)
    },
    userID: async function() {
      await this.getGoals();
    }
  },
  methods: {
    async addGoal() {
      if(this.goalDescription) {
        try {

          let createdDate = new Date();
          let fireStamp = new firebase.firestore.Timestamp.fromDate(createdDate);

          await this.$db.collection('goals').add({
            description: this.goalDescription,
            category: this.pillarCategory,
            ownerID: this.userID,
            completed: false,
            createdAt: fireStamp
          });
          this.goalAddedSuccessfully = true;
          setTimeout(() => this.goalAddedSuccessfully = false , 2000);

          await this.getGoals();
        } catch (err) {
          alert('Something went wrong, please try again ' + err);
        }
      }
      this.goalDescription = '';
    },
    async getGoals() {
      this.loading = true;

      this.goals = [];
      const docRef = await this.$db
        .collection('goals')
        .where('ownerID', '==', this.userID)
        .where('category', '==', this.pillarCategory)
        .orderBy("createdAt", 'desc')

      const snapshot = await docRef.get();

      snapshot.forEach(doc => {
        let goal = {};
        goal = doc.data();
        goal.id = doc.id;

        this.goals.push(goal);
      });

      this.loading = false;
    },
  }
};
</script>

<style lang="stylus" scoped>
  .container
    #goal-description
      height 8rem
      resize none

    .drag-list-item
      cursor pointer
      min-width 10rem
      margin-bottom -1px
      border 1px solid rgba(135, 135, 135, 0.2)
      .strike
        text-decoration: line-through

</style>
