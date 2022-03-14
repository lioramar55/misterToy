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
  data() {
    return { toys: null }
  },
  created() {
    toyService.query().then((toys) => (this.toys = toys))
  },
  components: {
    toyList,
    toyFilter,
  },
}
</script>

<style></style>
