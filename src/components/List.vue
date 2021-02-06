<template lang="pug">
  .col-3.list-label.mb-2.mt-5 {{ pillar.name }}
    draggable.list-group(v-model='pillar.goals' group='all-goals' @start='drag=true' @end='drag=false')
      .list-group-item.drag-list-item.py-2.px-4.d-flex.justify-content-between.align-items-center(v-for='goal in pillar.goals' :key='goal.id')
        span( :class="{ strike: goal.completed}") {{ goal.text }}
        .buttons-container.d-flex.align-items-center.justify-content-between.ml-4
          input(type="checkbox" :checked="goal.completed"  @change="goal.completed = !goal.completed")
          i.far.fa-trash-alt.ml-3(@click="deleteGoal(goal.id)")
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: {
    pillar: {
      type: Object
    }
  },
  components: { draggable },
  methods: {
    deleteGoal(id) {
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