<template>
  <section class="add-review">
    <h2>Add a review</h2>
    <form @submit.prevent="onSubmit">
      <label>
        First name:
        <input type="text" placeholder="Enter your first name" v-model="review.name" required />
      </label>
      <label>
        Rating:
        <select v-model="review.rate" required>
          <option v-for="rate in rates" :key="rate" :value="rate">
            {{ '*'.repeat(rate) }}
          </option>
        </select>
      </label>
      <label>
        Read at:
        <input type="date" v-model="review.date" required />
      </label>
      <label
        >Your review:
        <textarea cols="30" rows="10" v-model="review.text" required></textarea>
      </label>
      <button>Submit</button>
    </form>
    <button @click="closeReview" class="close-review">X</button>
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
}
</script>

<style></style>
