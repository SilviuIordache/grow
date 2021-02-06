<template lang="pug">
  .col-3.list-label.mb-2.mt-5 {{ name }}
    draggable.list-group.list-style-custom(v-model='goals' group='all-goals' @start='drag=true' @end='drag=false')
      .list-group-item.drag-list-item.py-2.px-4.d-flex.justify-content-between.align-items-center(v-for='goal in goals' :key='goal.id')
        span( :class="{ strike: goal.completed}") {{ goal.text }}
        .buttons-container.d-flex.align-items-center.justify-content-between.ml-4
          input(type="checkbox" :checked="goal.completed"  @change="goal.completed = !goal.completed")
          i.far.fa-trash-alt.ml-3(@click="deleteGoal(goal.id)")
</template>

<script>
import draggable from 'vuedraggable';
import { pillarUpdate } from '../mixins/pillarUpdate.js'

export default {
  components: { draggable },
  mixins: [pillarUpdate],
  props: ['pillar'],
  data() {
    return {
      name: '',
      goals: [],
    }
  },
  mounted() {
    this.name = this.pillar.name;
    this.goals = this.pillar.goals;
  },
  methods: {
    deleteGoal(id) {
    }
  },
  watch: {
    goals: function () {
      this.$parent.$emit('list:updated', {
        pillar: this.pillar.name,
        goals: this.goals
      })
    },
  }
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