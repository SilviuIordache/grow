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
            input#goal.ml-2(type='text' name='goal' v-model="newGoal")
          .form-field
            input(type="submit" name="submit" value="Add Goal" @click="addGoal()")

        .list-label.mb-2.mt-5 General Goals
          draggable.list-group(v-model='goals' group='people' @start='drag=true' @end='drag=false')
            .list-group-item.drag-list-item.py-2.px-4.d-flex.justify-content-between.align-items-center(v-for='goal in goals' :key='goal.id')
              span {{ goal }}
              input(type="checkbox" :id="goal.id")
      .col-8

</template>

<script>
import draggable from 'vuedraggable'


export default {
  components: { draggable },
  data() {
    return {
      goals: ['Read a book'],
      newGoal: ''
    }
  },
  mounted() {

  },
  methods: {
    addGoal() {
      if(this.newGoal) {
        this.goals.push(this.newGoal);
        this.newGoal = '';
      }
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
      // &:first-child
      //   border-top-left-radius .25rem
      //   border-top-right-radius .25rem

</style>
