<template>
  <section class="toy-details main-layout" v-if="toy">
    <el-page-header
      :content="toy.name"
      @back="$router.push('/toy/')"
    />
    <h2>{{ toy.name }}</h2>
    <el-collapse accordion v-model="activeName">
      <el-collapse-item name="1" title="Labels">
        <div v-if="toy.labels" class="labels">
          <span v-for="label in toy.labels" :key="label">{{
            label
          }}</span>
        </div>
        <div v-else>No labels</div>
      </el-collapse-item>
      <el-collapse-item name="2" title="Description"
        >Lorem ipsum, dolor sit amet consectetur adipisicing
        elit. Ipsum exercitationem soluta tenetur,
        voluptatibus facilis nesciunt itaque dolorum totam
        iure nisi pariatur doloribus placeat perferendis
        officiis magnam illum maxime harum amet explicabo
        alias. Excepturi sint asperiores
        perferendis</el-collapse-item
      >
      <el-collapse-item name="4" title="Published at">{{
        time
      }}</el-collapse-item>
      <el-collapse-item name="5" title="Price">{{
        $filters.currencyUSD(toy.price)
      }}</el-collapse-item>
      <el-collapse-item name="6" title="Is available">{{
        isAvailable
      }}</el-collapse-item>
    </el-collapse>

    <el-button
      type="primary"
      @click="$router.push('/toy/edit/' + toy._id)"
    >
      Edit toy
    </el-button>

    <add-review
      v-if="user"
      @reviewAdded="onAddReview"
    ></add-review>
    <router-link v-else to="/login" class="main"
      >Log in to add reviews</router-link
    >
    <toy-reviews :toy="toy"></toy-reviews>
  </section>
  <section v-else class="loader">Loading...</section>
</template>

<script>
import toyService from '../services/toy-service'
import toyReviews from '../components/toy-reviews.vue'
import addReview from '../components/add-review.vue'
export default {
  name: 'toy-details',
  data() {
    return {
      toy: null,
      activeName: 1,
    }
  },
  async created() {
    await this.loadToy()
  },
  components: {
    toyReviews,
    addReview,
  },
  methods: {
    async onAddReview(review) {
      await this.$store.dispatch({
        type: 'addReview',
        review,
        toy: { ...this.toy },
      })
      this.loadToy
    },
    async loadToy() {
      var { id } = this.$route.params
      const toy = await toyService.getById(id)
      this.toy = toy
    },
  },
  computed: {
    isAvailable() {
      return this.toy.inStock ? 'In stock' : 'Out of stock'
    },
    time() {
      return new Date(this.toy.createdAt).toDateString()
    },
    user() {
      return this.$store.getters.user
    },
  },
}
</script>

<style scoped>
.toy-details {
  text-align: center;
}
</style>
