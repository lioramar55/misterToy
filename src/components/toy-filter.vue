<template>
  <section class="toy-filter">
    <input type="text" placeholder="Search" v-model="filterBy.txt" @change="onInput" />
  </section>
</template>

<script>
export default {
  name: 'toy-filter',
  data() {
    return {
      filterBy: {
        txt: '',
        inStock: '',
        type: '',
        sortBy: '',
      },
    }
  },
  methods: {
    onInput() {
      _debounce(() => {
        this.$store.dispatch({ type: 'setFilter', filterBy: { ...this.filterBy } })
      }, 500)
    },
  },
}
</script>

<style></style>
