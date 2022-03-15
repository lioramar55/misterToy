<template>
  <section class="dashboard">
    <h1>
      Dashboard - view stats about the shop and more...
    </h1>
    <h2>Average price per toy type:</h2>
    <pie-chart :data="data"></pie-chart>
    <h2>Inventory by type</h2>
  </section>
</template>

<script>
import pieChart from '../components/pie-chart.vue'
export default {
  components: {
    pieChart,
  },
  computed: {
    data() {
      console.log(
        'this.$store.getters.typesData',
        this.$store.getters.typesData
      )
      return this.$store.getters.typesData
    },
  },
}
</script>

<style></style>
