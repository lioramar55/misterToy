<template>
  <section class="toy-filter">
    <label
      >Search name
      <el-input
        v-model="filterBy.txt"
        @input="onInput"
        placeholder="Search for toy name"
      />
    </label>
    <label @click="setFilter">
      By stock
      <el-select
        v-model="filterBy.inStock"
        @change="setFilter"
        class="m-2"
        placeholder="In stock?"
        size="large"
      >
        <el-option
          v-for="option in inStockOpt"
          :key="option"
          :value="option"
          >{{ option }}</el-option
        >
      </el-select>
    </label>
    <label
      >By label
      <el-select
        v-model="filterBy.label"
        @change="setFilter"
        multiple
        placeholder="Select"
        style="width: 240px"
      >
        <el-option
          v-for="label in labels"
          :key="label"
          :value="label"
        />
      </el-select>
    </label>

    <label>Sort By</label>

    <el-button @click="setSortBy('price')" type="info"
      >Price
    </el-button>
    <el-button @click="setSortBy('name')" type="info"
      >Name</el-button
    >
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
        dir: 1,
        label: [],
      },
      inStockOpt: ['All', 'In stock', 'Out of stock'],
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
    setSortBy(sort) {
      console.log('sort', sort)
      this.filterBy.sortBy = sort
      if (this.$store.getters.lastSortBy === sort)
        this.filterBy.dir = this.filterBy.dir === 1 ? -1 : 1
      this.setFilter()
    },
    setFilter() {
      this.$store.dispatch({
        type: 'setFilter',
        filterBy: JSON.parse(JSON.stringify(this.filterBy)),
      })
    },
  },
  computed: {
    isAsc() {
      return this.filterBy.dir === 1
    },
    isByPrice() {
      return this.filterBy.sort === 'price'
    },
    isByName() {
      return this.filterBy.dir === 'name'
    },
  },
}
</script>

<style scoped>
label {
  cursor: pointer;
}
</style>
