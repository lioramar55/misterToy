<template>
  <section class="toy-details main-layout" v-if="toy">
    <el-page-header
      :content="toy.name"
      @back="$router.push('/toy/')"
    />
    <h2>{{ toy.name }}</h2>
    <el-collapse accordion v-model="activeName">
      <el-collapse-item name="1" title="Category">
        {{ toy.type }}</el-collapse-item
      >
      <el-collapse-item name="2" title="Description"
        >Lorem ipsum, dolor sit amet consectetur adipisicing
        elit. Ipsum exercitationem soluta tenetur,
        voluptatibus facilis nesciunt itaque dolorum totam
        iure nisi pariatur doloribus placeat perferendis
        officiis magnam illum maxime harum amet explicabo
        alias. Excepturi sint asperiores
        perferendis</el-collapse-item
      >
      <el-collapse-item name="3" title="Task"
        >Task</el-collapse-item
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
      <el-collapse-item name="7" title="Labels"
        ><label-display :toy="toy"></label-display
      ></el-collapse-item>
    </el-collapse>

    <el-button
      type="primary"
      @click="$router.push('/toy/edit/' + toy._id)"
    >
      Edit toy
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
      activeName: 1,
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
.toy-details {
  text-align: center;
}
</style>
