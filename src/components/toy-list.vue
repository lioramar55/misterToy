<template>
  <section v-if="toys" class="toy-list">
    <div class="toy" v-for="toy in toys" :key="toy._id">
      <toy-preview :toy="toy"></toy-preview>
    </div>
  </section>
  <section v-else>Loading...</section>
</template>

<script>
import toyPreview from './toy-preview.vue'
export default {
  name: 'toy-list',
  props: {
    toys: Object,
  },
  data() {
    return {}
  },
  components: {
    toyPreview,
  },
}
</script>

<style></style>
