<template>
  <section class="toy-reviews">
    <section v-if="toy.reviews.length" class="reviews">
      <div v-for="review in reviews" :key="review._id">
        <p><span>From:</span> {{ review.name }}</p>
        <p><span>At:</span> {{ review.date }}</p>
        <p><span>Rate:</span> {{ '⭐'.repeat(review.rate) }}</p>
        <p><span>Review:</span> {{ review.text }}</p>
        <button @click="removeReview(review._id)">X</button>
      </div>
    </section>
    <h4 v-else>This toy has no reviews</h4>
  </section>
</template>

<script>
export default {
  name: 'toy-reviews',
  props: {
    toy: Object,
  },
  data() {
    return {}
  },
  computed: {
    reviews() {
      return this.toy.reviews
    },
  },
}
</script>

<style></style>
