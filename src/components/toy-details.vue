<template>
  <section class="toy-details main-layout" v-if="toy">
    <h1>Title: {{ toy.name }}</h1>
    <h4>Published at {{ time }}</h4>
    <h3>Category: {{ toy.type }}</h3>
    <h3>Description</h3>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum exercitationem soluta tenetur,
      voluptatibus facilis nesciunt itaque dolorum totam iure nisi pariatur doloribus placeat
      perferendis officiis magnam illum maxime harum amet explicabo alias. Excepturi sint asperiores
      perferendis alias dolorem eos. Ea ratione voluptate quibusdam consectetur fugit accusamus,
      earum, delectus in pariatur enim quisquam iure eos nostrum? Nihil est temporibus architecto
      commodi unde, non nesciunt rerum dignissimos, laborum doloremque minima ducimus error optio.
      Explicabo natus veniam totam fuga, provident animi! Maiores unde repellendus sint aliquam
      pariatur facere omnis dicta nesciunt cum quod iure aut perspiciatis laboriosam, dolorem sed
      nihil molestias blanditiis atque?
    </p>
    <h3>Price: {{ $filters.currencyUSD(toy.price) }}</h3>
    <h4>{{ isAvailable }}</h4>
    <span class="label" v-for="label in toy.labels" :key="label + toy._id">
      {{ label }}
    </span>
    <button @click="$router.push('/shop')">Back to list</button>
  </section>
  <section v-else class="loader">Loading...</section>
</template>

<script>
import toyService from '../services/toy-service'
export default {
  name: 'toy-details',
  data() {
    return {
      toy: null,
    }
  },
  created() {
    const { id } = this.$route.params
    toyService.getById(+id).then((toy) => (this.toy = toy))
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

<style></style>
