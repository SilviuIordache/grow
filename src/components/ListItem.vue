<template lang="pug">
.list-group-item.drag-list-item.py-2.px-4.d-flex.justify-content-between.align-items-center(:key='goal.id'
  @mouseover="buttonsVisible = true"  @mouseleave="buttonsVisible = false")
  .text-container
    span.text-info.mr-2(v-if="recentGoal") (NEW)
    span(:class="{ strike: goal.completed}") {{ goal.description }}
    p.text-muted.mb-0 {{ formattedDate(goal.createdAt) }}
  .buttons-container.d-flex.align-items-center.justify-content-between.ml-4(v-if="buttonsVisible")
    input(type="checkbox" :checked="goal.completed"  @change="toggleGoalCompletion()")
    i.goal-check.far.fa-trash-alt.ml-3(@click="deleteGoal()")
</template>

<script>

import { formattedDate } from '../mixins/formattedDate.js'
export default {
  mixins: [formattedDate],
  props: {
    goal: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      buttonsVisible: false,
    }
  },
  methods: {
    async deleteGoal() {
      const confirmDelete = confirm('Are you sure you want to delete this goal?');

      if (confirmDelete) {
        try {
          await this.$db.collection('goals').doc(this.goal.id).delete();
          this.$parent.$emit('goal:deleted')
        } catch (err) {
          console.log(err);
        }
      }
    },
    async toggleGoalCompletion() {
      try {
        await this.$db.collection('goals').doc(this.goal.id).update({ completed: !this.goal.completed });
        this.$parent.$emit('goal:updated')
      } catch (err) {
        console.log(err);
      }
    },
    // formattedDate(timeStamp) {
    //   const date = timeStamp.toDate().toISOString().split('T')
    //   const calendar = date[0];
    //   const hours = date[1].split('.')[0];
    //   return calendar + ', ' + hours
    // },
  },
  computed: {
    recentGoal() {
      const goalAge = (Date.now() - this.goal.createdAt.toDate() ) / (1000)
      if (goalAge < 30)
        return true
    }
  }
};
</script>

<style lang="stylus" scoped>
  .drag-list-item
    cursor pointer
    min-width 10rem
    margin-bottom -1px
    border 1px solid rgba(135, 135, 135, 0.2)
    .strike
      text-decoration: line-through
    
  .goal-check
    cursor pointer
</style>