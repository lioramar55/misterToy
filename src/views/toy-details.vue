<template>
  <section class="toy-details main-layout" v-if="toy">
    <h1>Title: {{ toy.name }}</h1>
    <h4>Published at {{ time }}</h4>
    <h3>Category: {{ toy.type }}</h3>
    <h3>Description</h3>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Ipsum exercitationem soluta tenetur,
      voluptatibus facilis nesciunt itaque dolorum totam
      iure nisi pariatur doloribus placeat perferendis
      officiis magnam illum maxime harum amet explicabo
      alias. Excepturi sint asperiores perferendis alias
      dolorem eos. Ea ratione voluptate quibusdam
      consectetur fugit accusamus, earum, delectus in
      pariatur enim quisquam iure eos nostrum? Nihil est
      temporibus architecto commodi under
    </p>
    <h3>
      Price:
      {{ $filters.currencyUSD(toy.price) }}
    </h3>
    <h4>{{ isAvailable }}</h4>
    <label-display :toy="toy"></label-display>
    <el-button
      type="primary"
      @click="$router.push('/toy/edit/' + toy._id)"
    >
      Edit toy
    </el-button>
    <el-button
      type="primary"
      @click="$router.push('/toy/')"
    >
      Back to list
    </el-button>
    <add-review @reviewAdded="onAddReview"></add-review>
    <toy-reviews :toy="toy"></toy-reviews>
  </section>
  <section v-else class="loader">Loading...</section>
</template>

<script>
import toyService from '../services/toy-service'
import toyReviews from '../components/toy-reviews.vue'
import addReview from '../components/add-review.vue'
import labelDisplay from '../components/label-display.vue'
export default {
  name: 'toy-details',
  data() {
    return {
      toy: null,
    }
  },
  created() {
    this.loadToy()
  },
  components: {
    toyReviews,
    addReview,
    labelDisplay,
  },
  methods: {
    onAddReview(review) {
      this.$store
        .dispatch({
          type: 'addReview',
          review,
          toy: { ...this.toy },
        })
        .then(this.loadToy)
    },
    loadToy() {
      var { id } = this.$route.params
      if (!isNaN(+id)) id = +id

      toyService.getById(id).then((toy) => (this.toy = toy))
    },
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

<style scoped>
* {
  text-align: center;
}
</style>
