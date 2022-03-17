<template>
  <section v-if="toys" class="toy-list">
    <article v-for="toy in toys" :key="toy._id" class="toy">
      <toy-preview
        :toy="toy"
        @removeToy="onRemoveToy"
      ></toy-preview>
    </article>
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
  methods: {
    onRemoveToy(id) {
      this.$emit('removeToy', id)
    },
  },
}
</script>

<style></style>
