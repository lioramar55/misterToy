<template>
  <section class="toy-reviews">
    <h2>User reviews</h2>
    <div v-if="reviews && reviews.length" class="reviews">
      <el-row>
        <el-col
          v-for="review in reviews"
          :key="review._id"
          :span="8"
        >
          <el-card :body-style="{ padding: '0px' }">
            <p><span>From:</span> {{ review.name }}</p>
            <p><span>At:</span> {{ review.date }}</p>
            <p>
              <span>Rate:</span>
              {{ '⭐'.repeat(review.rate) }}
            </p>
            <p><span>Review:</span> {{ review.txt }}</p>
            <el-button
              type="danger"
              @click="removeReview(review._id)"
            >
              X
            </el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <h4 v-else>This toy has no reviews</h4>
  </section>
</template>

<script>
import reviewService from '../services/review-service.js'
export default {
  name: 'toy-reviews',
  props: {
    toy: Object,
  },
  data() {
    return {
      reviews: null,
    }
  },
  async created() {
    const reviews = await reviewService.query({
      aboutToyId: this.toy._id,
    })
    this.reviews = reviews
  },
  methods: {
    async removeReview(reviewId) {
      await reviewService.remove(reviewId)
      const reviews = await reviewService.query({
        aboutToyId: this.toy._id,
      })
      this.reviews = reviews
    },
  },
}
</script>

<style></style>
