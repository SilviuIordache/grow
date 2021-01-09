<template lang="pug">
  main
    navigation-bar
    router-view
</template>

<script>
  import NavigationBar from './components/NavigationBar.vue';

  export default {
    components: {
      'navigation-bar': NavigationBar
    },
    mounted() {
      this.$on('productAddedToCart', (product) => {
        console.log(product);
      })
    }
  }
</script>