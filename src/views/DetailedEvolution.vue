<template lang="pug">
  .container
    .grow-card
      Happiness-Graph
</template>

<script>
import HappinessGraph from '../components/HappinessGraph.vue';

export default {
  name: 'DetailedEvolution',
  components: { HappinessGraph },
};
</script>

