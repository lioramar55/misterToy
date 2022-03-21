<template>
  <section class="main-layout" v-if="toy">
    <el-page-header
      :content="toy.name"
      @back="$router.push('/toy/')"
    />
    <div class="toy-details">
      <h2>{{ toy.name }}</h2>
      <ul class="details">
        <li>
          <div v-if="toy.labels" class="labels">
            <p>Labels:</p>
            <span
              v-for="label in toy.labels"
              :key="label"
              >{{ label }}</span
            >
          </div>
          <div v-else>No labels</div>
        </li>
        <li>
          <p>Description:</p>
          Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Ipsum exercitationem soluta
          tenetur, voluptatibus facilis nesciunt itaque
          dolorum totam iure nisi pariatur doloribus placeat
          perferendis officiis magnam illum maxime harum
          amet
        </li>

        <li>
          <p>Published at:</p>
          {{ time }}
        </li>
        <li>
          <p>Price:</p>
          {{ $filters.currencyUSD(toy.price) }}
        </li>
        <li>
          <p>Available?:</p>
          {{ isAvailable }}
        </li>
      </ul>
      <button
        class="btn dark"
        @click="$router.push('/toy/edit/' + toy._id)"
      >
        Edit toy
      </button>
    </div>
    <toy-chat :toy="toy"></toy-chat>
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
import toyChat from '../components/toy-chat.vue'
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
    toyChat,
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

<style></style>
