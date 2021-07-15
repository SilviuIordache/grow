<template lang="pug">
  .container
    .grow-card
      h3.mb-5 Happiness & Pillars evolution
      Happiness-Graph
</template>

<script>
import HappinessGraph from '../components/HappinessGraph.vue';

export default {
  name: 'DetailedEvolution',
  components: { HappinessGraph },
};
</script>

