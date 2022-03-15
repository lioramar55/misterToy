<template>
  <section class="toy-reviews">
    <h2>User reviews</h2>
    <div v-if="toy.reviews.length" class="reviews">
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
            <p><span>Review:</span> {{ review.text }}</p>
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
