<template>
  <section class="add-review">
    <h2>Add a review</h2>
    <form class="review-form" @submit.prevent="onSubmit">
      <label>
        First name:
        <input type="text" placeholder="Enter your first name" v-model="review.name" required />
      </label>
      <label>
        Rating:
        <select v-model="review.rate" required>
          <option v-for="rate in rates" :key="rate" :value="rate">
            {{ '⭐'.repeat(rate) }}
          </option>
        </select>
      </label>
      <label>
        Purchased at:
        <input type="date" v-model="review.date" />
      </label>
      <label
        >Your review:
        <textarea cols="20" rows="5" v-model="review.text" required></textarea>
      </label>
      <button>Submit</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      review: {
        name: '',
        rate: '',
        date: new Date().toISOString().slice(0, 10),
        text: '',
      },
      rates: [1, 2, 3, 4, 5],
    }
  },
  methods: {
    onSubmit() {
      this.$emit('reviewAdded', { ...this.review })
      this.review = {
        name: '',
        rate: '',
        date: new Date().toISOString().slice(0, 10),
        text: '',
      }
    },
  },
}
</script>

<style scoped>
.review-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

textarea {
  resize: none;
}
</style>
