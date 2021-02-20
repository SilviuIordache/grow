<template lang="pug">
.list-group-item.drag-list-item.py-2.px-4.d-flex.justify-content-between.align-items-center(:key='goal.id')
  span( :class="{ strike: goal.completed}") {{ goal.text }}
  .buttons-container.d-flex.align-items-center.justify-content-between.ml-4(v-if="")
    input(type="checkbox" :checked="goal.completed"  @change="goal.completed = !goal.completed")
    i.far.fa-trash-alt.ml-3(@click="deleteGoal(goal.id)")
</template>

<script>
import draggable from 'vuedraggable';
import { pillarUpdate } from '../mixins/pillarUpdate.js'

export default {
  components: { draggable },
  mixins: [pillarUpdate],
  props: {
    goal: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      buttonsVisible: false,
    }
  },
  methods: {
    deleteGoal(id) {
    }
  },
};

</script>

<style lang="stylus" scoped>
  .main
    color gray
    .list-style-custom
      min-height 15rem
      min-width 10rem
      border 1px solid rgba(135, 135, 135, 0.2)
      background-color rgba(135, 135, 135, 0.4)
      .drag-list-item
        cursor pointer
        min-width 10rem
        margin-bottom -1px
        border 1px solid rgba(135, 135, 135, 0.2)
        .strike
          text-decoration: line-through
</style>