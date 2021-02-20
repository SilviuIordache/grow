<template lang="pug">
  .col-3.list-label.mb-2.mt-5 {{ name }}
    draggable.list-group.list-style-custom(v-model='goals' group='all-goals' @start='drag=true' @end='drag=false')
      List-Item(v-for='goal in goals' :goal="goal")

</template>

<script>
import draggable from 'vuedraggable';
import { pillarUpdate } from '../mixins/pillarUpdate.js'
import ListItem from './ListItem.vue';

export default {
  components: { draggable, ListItem },
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
</style>