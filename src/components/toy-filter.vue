<template>
  <section class="toy-filter">
    <input type="text" placeholder="Search" v-model="filterBy.txt" @input="onInput" />
    <label @click="setFilter"
      >In stock
      <input type="radio" v-model="filterBy.inStock" @change="setFilter" value="inStock" hidden />
    </label>
    <label @click="setFilter"
      >Out of stock
      <input
        type="radio"
        v-model="filterBy.inStock"
        @change="setFilter"
        value="outOfStock"
        hidden
      />
    </label>
    <select @change="setFilter" v-model="filterBy.label" multiple>
      <option v-for="label in labels" :key="label" :value="label">
        {{ label }}
      </option>
    </select>
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
        label: [],
      },
      labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor'],
    }
  },
  components: {},
  methods: {
    onInput() {
      this.$store.dispatch({ type: 'setFilter', filterBy: { ...this.filterBy } })
    },
    setFilter() {
      this.$store.dispatch({ type: 'setFilter', filterBy: { ...this.filterBy } })
    },
  },
}
</script>

<style scoped>
label {
  cursor: pointer;
}
</style>
