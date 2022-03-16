<template>
  <div class="toy-preview">
    <h2>{{ toy.name }}</h2>
    <h3>Price: {{ $filters.currencyUSD(toy.price) }}</h3>
    <h4>{{ isAvailable }}</h4>
    <p>Category: {{ toy.type }}</p>
    <label-display :toy="toy"></label-display>
    <el-button
      type="info"
      @click="$router.push('/toy/' + toy._id)"
    >
      Details
    </el-button>
    <el-button
      type="primary"
      @click="$router.push('/toy/edit/' + toy._id)"
    >
      Edit toy
    </el-button>
    <el-button
      type="danger"
      @click="$emit('removeToy', toy._id)"
      >Delete
    </el-button>
  </div>
</template>

<script>
import labelDisplay from './label-display.vue'
export default {
  name: 'toy-preview',
  props: {
    toy: Object,
  },
  component: {
    labelDisplay,
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
