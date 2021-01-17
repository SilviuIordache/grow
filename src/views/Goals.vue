<template lang="pug">
  .main.container
    .row
      .col-12
        h1 Your Goals
    .row
      .col-4
        form.ml-4(method="POST"  @submit.prevent="")
          .form-field
            label(for='goal') Enter a new goal:
            input#goal.ml-2(type='text' name='goal' v-model="newGoalText")
          .form-field
            input(type="submit" name="submit" value="Add Goal" @click="addGoal()")

        .list-label.mb-2.mt-5 General Goals
          draggable.list-group(v-model='goals' group='people' @start='drag=true' @end='drag=false')
            .list-group-item.drag-list-item.py-2.px-4.d-flex.justify-content-between.align-items-center(v-for='goal in goals' :key='goal.id')
              span( :class="{ strike: goal.completed}") {{ goal.text }}
              .buttons-container.d-flex.align-items-center.justify-content-between.ml-4
                input(type="checkbox" :checked="goal.completed"  @change="goal.completed = !goal.completed")
                i.far.fa-trash-alt.ml-3(@click="deleteGoal(goal.id)")
      .col-8

</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  data() {
    return {
      goals: [],
      newGoalText: ''
    }
  },
  mounted() {
    this.getGoals();
  },
  methods: {
    addGoal() {
      if(this.newGoalText) {
        const newGoal = {
          id: Math.floor(Math.random()*90000) + 10000,
          text: this.newGoalText,
          completed: false
        }
        this.goals.push(newGoal);
        localStorage.setItem('goals', JSON.stringify(this.goals));
        this.newGoalText = '';
      }
    },
    getGoals() {
      const storedGoals = JSON.parse(localStorage.getItem('goals'));
      if (storedGoals) {
        this.goals = storedGoals
      }
    },
    deleteGoal(id) {
      this.goals = this.goals.filter(goal => goal.id != id);
      localStorage.setItem('goals', JSON.stringify(this.goals));
    }
  }
};
</script>

<style scoped lang="stylus">
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
