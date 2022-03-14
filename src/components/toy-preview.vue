<template>
  <div class="toy-preview">
    <h2>{{ toy.name }}</h2>
    <h3>Price: {{ toy.price }}</h3>
    <h4>{{ isAvailable }}</h4>
    <p>Category: {{ toy.type }}</p>
    <p>{{ time }}</p>
    <button>Details</button>
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
