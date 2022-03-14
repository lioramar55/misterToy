<template>
  <div class="toy-preview">
    <pre>{{ toy }}</pre>
    <h2>{{ toy.name }}</h2>
    <h3>Price: {{ toy.price }}</h3>
    <p>Category: {{ toy.type }}</p>
    <button>Details</button>
  </div>
</template>

<script>
export default {
  name: 'toy-preview',
  props: {
    toy: Object,
  },
}
</script>

<style></style>
