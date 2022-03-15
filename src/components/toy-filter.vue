<template>
  <section class="toy-filter">
    <input
      type="text"
      placeholder="Search"
      v-model="filterBy.txt"
      @input="onInput"
    />
    <label @click="setFilter">
      By stock
      <select
        v-model="filterBy.inStock"
        @change="setFilter"
      >
        <option value="">All</option>
        <option value="true">In stock</option>
        <option value="false">Out of stock</option>
      </select>
    </label>
    <label
      >By label
      <select
        @change="setFilter"
        v-model="filterBy.label"
        multiple
      >
        <option
          v-for="label in labels"
          :key="label"
          :value="label"
        >
          {{ label }}
        </option>
      </select>
      <label
        >Sort by:
        <select
          @change="setFilter"
          v-model="filterBy.sortBy"
        >
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </label>
    </label>
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
      labels: [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
      ],
    }
  },
  components: {},
  methods: {
    onInput() {
      this.$store.dispatch({
        type: 'setFilter',
        filterBy: JSON.parse(JSON.stringify(this.filterBy)),
      })
    },
    setFilter() {
      this.$store.dispatch({
        type: 'setFilter',
        filterBy: JSON.parse(JSON.stringify(this.filterBy)),
      })
    },
  },
}
</script>

<style scoped>
label {
  cursor: pointer;
}
</style>
