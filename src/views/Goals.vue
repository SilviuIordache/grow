<template lang="pug">
  .main.container
    .row
      .col-12
        h1 Your Goals
    .row
      .col-4
        form
          ul
            li
              label Enter goal:
              input
            li
              button Add
        .list-label.mb-2 This is the title
        draggable.list-group(v-model='myArray' group='people' @start='drag=true' @end='drag=false')
          .list-group-item.drag-list-item.py-2.px-4(v-for='element in myArray' :key='element.id') {{ element }}
      .col-8

</template>

<script>
import draggable from 'vuedraggable'


export default {
  components: { draggable },
  data() {
    return {
      myArray: ['do this', 'the other', 'another']
    }
  },
  mounted() {

  },
  methods: {
  
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
