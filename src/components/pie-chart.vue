<template>
  <PieChart :chartData="data" />
</template>

<script>
import { PieChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  props: { data: Object },
  components: { PieChart },
  created() {},
}
</script>
