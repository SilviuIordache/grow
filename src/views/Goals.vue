<template lang="pug">
  .main.container
    .row
      .col-12
        h1 Your Goals
    .row
      .col-6
        form(method="POST"  @submit.prevent="")
          .form-field
            label.mr-1(for='goal-text') Enter a new goal:
            input#goal-text.mb-4(required type='text' name='goal' v-model="newGoal.text")
          .form-field
            label.mr-1(for='goal-category') Choose a goal category:
            select#goal-category.mb-2(required v-model="newGoal.category")
              option(value="")  --- choose a pillar ---
              option(v-for="pillar in pillars" :value="pillar.name") {{ pillar.name }}
          .form-field.mt-4
            input(type="submit" name="submit" value="Add Goal" @click="addGoal()")
    .row
      list(v-for="pillar in pillars" :pillar="pillar")

</template>

<script>
import List from '../components/List.vue';
import { pillarUpdate } from '../mixins/pillarUpdate.js'

export default {
  components: { 
    'List': List
  },
  mixins: [pillarUpdate],
  data() {
    return {
      pillars: [],
      newGoal: {
        text: '',
        category: ''
      }
    }
  },
  mounted() {
    this.getPillars();

    this.$on('list:updated', (data) => {
      const { pillar, goals} = data;
      this.updatePillarGoals(pillar, goals)
    })
  },
  methods: {
    addGoal() {
      if(this.newGoal.text) {
        const goal = {
          id: Math.floor(Math.random()*90000) + 10000,
          text: this.newGoal.text,
          completed: false
        }

        const newGoals = this.pillars.find((pillar) => pillar.name === this.newGoal.category).goals;
        newGoals.push(goal);
  
        this.updatePillarGoals(this.newGoal.category, newGoals);

        // reset form
        this.newGoal = {text: '', category: '' }
      }
    },
    getPillars() {
      const storedPillars = JSON.parse(localStorage.getItem('pillars'));
      if (storedPillars) {
        this.pillars = storedPillars;
      }
    },
    deleteGoal(id) {
      this.goals = this.goals.filter(goal => goal.id != id);
      localStorage.setItem('goals', JSON.stringify(this.goals));
    }
  }
};
</script>

<style lang="stylus" scoped>
  .main
    color gray

    .drag-list-item
      cursor pointer
      min-width 10rem
      margin-bottom -1px
      border 1px solid rgba(135, 135, 135, 0.2)
      .strike
        text-decoration: line-through
</style>
