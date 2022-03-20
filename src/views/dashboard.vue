<template>
  <section v-if="toys" class="dashboard">
    <h1>
      Dashboard - view stats about the shop and more...
    </h1>
    <h2>Average price per toy label:</h2>
    <pie-chart :data="pieData"></pie-chart>
    <h2>Inventory by label</h2>
    <bar-chart :data="barData"></bar-chart>
  </section>
  <section v-else>loading...</section>
</template>

<script>
import pieChart from '../components/pie-chart.vue'
import barChart from '../components/bar-chart.vue'
export default {
  name: 'dashboard',
  components: {
    pieChart,
    barChart,
  },
  computed: {
    toys() {
      return this.$store.getters.toys
    },
    pieData() {
      return this.$store.getters.pieData
    },
    barData() {
      return this.$store.getters.barData
    },
  },
}
</script>

<style scoped>
h1,
h2 {
  text-align: center;
}
</style>
