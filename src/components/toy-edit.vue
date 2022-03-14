<template>
  <section class="toy-edit">
    <h1 v-if="toy">Update {{ toy.name }}</h1>
    <form @submit.prevent="onToyEdit">
      <label
        >New name
        <input type="text" v-model="toyToUpdate.name" placeholder="Enter name" />
      </label>
      <label
        >New price
        <input type="number" v-model="toyToUpdate.price" placeholder="Enter price" />
      </label>
      <label>Update stock</label>
      <label>
        In stock
        <input type="radio" v-model="toyToUpdate.inStock" value="true" />
      </label>
      <label>
        Out of stock
        <input type="radio" v-model="toyToUpdate.inStock" value="false" />
      </label>
      <button>Save</button>
    </form>
    <button @click="$router.push('/shop/' + toy._id)">Cancel</button>
  </section>
</template>

<script>
import toyService from '../services/toy-service'
export default {
  data() {
    return {
      toy: null,
      toyToUpdate: {
        name: '',
        price: '',
        inStock: '',
      },
    }
  },
  created() {
    const { id } = this.$route.params
    toyService.getById(+id).then((toy) => {
      this.toy = toy
    })
  },
  methods: {
    onToyEdit() {
      this.toy.name = this.toyToUpdate.name
      this.toy.inStock = this.toyToUpdate.inStock
      this.toy.price = this.toyToUpdate.price
      this.$store
        .dispatch({ type: 'updateToy', toy: { ...this.toy } })
        .then(() => this.$router.push('/shop/' + this.toy._id))
    },
  },
}
</script>

<style>
.toy-edit {
  text-align: center;
}
.toy-edit form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
