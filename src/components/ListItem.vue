<template lang="pug">
.list-group-item.drag-list-item.py-2.px-4.d-flex.justify-content-between.align-items-center(
  :key='goal.id'
  @mouseover="buttonsVisible = true"
  @mouseleave="buttonsVisible = false"
  )
  span( :class="{ strike: goal.completed}") {{ goal.description }}
  .buttons-container.d-flex.align-items-center.justify-content-between.ml-4(v-if="buttonsVisible")
    input(type="checkbox" :checked="goal.completed"  @change="goal.completed = !goal.completed")
    i.far.fa-trash-alt.ml-3(@click="deleteGoal()")
</template>

<script>

export default {
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
      try {
        await this.$db.collection('goals').doc(this.goal.id).delete();
        this.$parent.$emit('goal:deleted')
      } catch (err) {
        console.log(err)
      }

    }
  },
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
</style>