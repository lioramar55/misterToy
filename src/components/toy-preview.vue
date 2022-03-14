<template>
  <div class="toy-preview">
    <h2>{{ toy.name }}</h2>
    <h3>Price: {{ $filters.currencyUSD(toy.price) }}</h3>
    <h4>{{ isAvailable }}</h4>
    <p>Category: {{ toy.type }}</p>
    <div class="labels">
      <span class="label" v-for="label in toy.labels" :key="label + toy._id">
        {{ label }}
      </span>
    </div>
    <button @click="$router.push('/shop/' + toy._id)">Details</button>
  </div>
</template>

<script>
export default {
  name: 'toy-preview',
  props: {
    toy: Object,
  },
  computed: {
    isAvailable() {
      return this.toy.inStock ? 'In stock' : 'Out of stock'
    },
    time() {
      return new Date(this.toy.createdAt).toDateString()
    },
  },
}
</script>

<style></style>
