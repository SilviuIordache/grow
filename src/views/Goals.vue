<template lang="pug">
  .container
    .row.mb-5
      .col-12.d-flex
        h1 Goals for

        select.d-inline#goal-category.ml-3(required v-model="pillarCategory")
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
        h2 Current goals ({{ goals.length}})
        .goals-container(v-if="goals.length > 0")
          //- .goal(v-for="goal in goals") {{ goal.description }}
          List(:goals="goals")
        .no-goals(v-else) No goals created yet for this category
  
    //- .row
    //-   list(v-for="pillar in pillars" :pillar="pillar")

</template>

<script>
import List from '../components/List.vue';
import pillarStorage from '../utils/pillarStorage';


export default {
  props: {
    userID: String
  },
  components: { 
    'List': List
  },
  data() {
    return {
      pillars: [],
      selectedPillar: 0,
      pillarCategory: 'Love',
      goalDescription: '',
      goals: [],
      goalAddedSuccessfully: false
    }
  },
  async mounted() {
    this.getPillars();

    this.goals = await this.getGoals();

    this.$on('list:updated', (data) => {
      // const { pillar, goals} = data;
      // pillarStorage.updatePillarGoals(pillar, goals)
    });

  },
  watch: {
    pillarCategory: function(val) {
      this.selectedPillar = this.pillars.findIndex((pillar) => pillar.name === this.pillarCategory)
    }
  },
  methods: {
    async addGoal() {
      if(this.goalDescription) {
        try {
          await this.$db.collection('goals').add({
            description: this.goalDescription,
            category: this.pillarCategory,
            ownerID: this.userID,
            completed: false
          });

          this.goalAddedSuccessfully = true;
          setTimeout(() => this.goalAddedSuccessfully = false , 2000);
          this.goals = await this.getGoals();

          this.getGoals();
        } catch {
          alert('Something went wrong, please try again');
        }
      }
      this.goalDescription = '';
    },
    async getGoals() {
      const goals = [];
      const docRef = await this.$db.collection('goals');
      const snapshot = await docRef.get();
      snapshot.forEach(doc => {
        goals.push(doc.data())
      });
      return goals;
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

    .drag-list-item
      cursor pointer
      min-width 10rem
      margin-bottom -1px
      border 1px solid rgba(135, 135, 135, 0.2)
      .strike
        text-decoration: line-through
</style>
