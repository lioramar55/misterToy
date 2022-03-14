<template>
  <div class="toy-shop main-layout">
    <h1>Welcome to the toy shop</h1>
    <toy-filter></toy-filter>
    <toy-list :toys="toys"></toy-list>
  </div>
</template>

<script>
import toyList from '../components/toy-list.vue'
import toyFilter from '../components/toy-filter.vue'
import toyService from '../services/toy-service.js'

export default {
  name: 'toy-shop',
  created() {},
  components: {
    toyList,
    toyFilter,
  },
  computed: {
    toys() {
      return this.$store.getters.toysForDisplay
    },
  },
}
</script>

<style></style>
