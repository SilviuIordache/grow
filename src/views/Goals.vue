<template lang="pug">
  .container
    .row.mb-5
      .col-12.d-flex
        h1 Goals for

        select.d-inline#goal-category.ml-3(required v-model="pillarCategory" @change="getGoals()")
          option(value="")  --- choose a pillar ---
          option(v-for="pillar in pillars" :value="pillar.name") {{ pillar.name }}
        i.ml-4.fa-3x(v-if="pillars.length > 0" :class="pillars[selectedPillar].icon" :style="{ color: pillars[selectedPillar].color}")

    .row
      .col-12.col-md-6
        h2.mb-4 New Goal
        form(method="POST"  @submit.prevent="")
          .form-group
            label.mr-1(for='goal-text') Description
            textarea#goal-description.form-control.mb-4(required type='text' name='goal' v-model="goalDescription")
          .form-group.mt-4
            input(type="submit" name="submit" value="Add Goal" @click="addGoal()")
            span.ml-3.text-success(v-if="goalAddedSuccessfully") Goal added successfully
      .col-12.col-md-6
        h2.mb-5 Current goals ({{ goals.length}})
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
import pillarStorage from '../utils/pillarStorage';

import firebase from 'firebase/app';
import 'firebase/auth';

export default {
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
    this.getPillars();
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
        } catch {
          alert('Something went wrong, please try again');
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

      const snapshot = await docRef.get();

      snapshot.forEach(doc => {
        let goal = {};
        goal = doc.data();
        goal.id = doc.id;

        this.goals.push(goal);
      });

      this.loading = false;
    },
    getPillars() {
      this.pillars = pillarStorage.get();
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
