<template>
  <div class="toy-shop main-layout">
    <h1>Welcome to the toy shop</h1>
    <toy-filter></toy-filter>
    <el-button
      type="primary"
      @click="$router.push('/toy/edit/')"
    >
      Add toy
    </el-button>
    <toy-list
      :toys="toys"
      @removeToy="onRemoveToy"
    ></toy-list>
  </div>
</template>

<script>
import toyList from '../components/toy-list.vue'
import toyFilter from '../components/toy-filter.vue'

export default {
  name: 'toy-shop',
  created() {},
  components: {
    toyList,
    toyFilter,
  },
  methods: {
    onRemoveToy(id) {
      this.$store.dispatch({ type: 'removeToy', id })
    },
  },
  computed: {
    toys() {
      return this.$store.getters.toys
    },
  },
}
</script>

<style></style>
