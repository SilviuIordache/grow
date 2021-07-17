<template lang="pug">
  .container
    .row
      .col-12.mb-4
        h1 Pillars of life
      .col-12.col-md-6.mb-3(v-for="pillar in pillars")
        .grow-card.p-4
          .title-container.mb-3
            i.mr-2.fa-lg(:class="pillar.icon" :style="{ color: pillar.color}")
            span {{ pillar.name }}
          p {{ pillar.description }}

</template>

<script>
import { dbMixin } from '../mixins/dbMixin.js';

export default {
  mixins: [dbMixin],
  name: 'Pillars',
  data() {
    return {
      pillars: []
    }
  },
  async mounted() {
    await this.getPillars();
  },
};
</script>

<style scoped lang="stylus">
 .title-container
    font-size 1.5rem
</style>
