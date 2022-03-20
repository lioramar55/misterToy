<template>
  <div class="login-page main-layout">
    <h1>Log in</h1>
    <form @submit.prevent="onSubmit">
      <label>
        Username:
        <input
          type="text"
          v-model="user.username"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          v-model="user.password"
          required
        />
      </label>
      <button>Submit</button>
    </form>
    <router-link to="/signup" class="main"
      >Open a new account</router-link
    >
  </div>
</template>
<script>
export default {
  name: 'login-page',
  data() {
    return {
      user: {
        password: '',
        username: '',
      },
    }
  },
  created() {
    const user = this.$store.getters.user
    if (user) this.$router.push('/')
  },
  methods: {
    async onSubmit() {
      const user = this.$store.dispatch({
        type: 'attemptLogin',
        user: { ...this.user },
      })
      if (user) this.$router.push('/')
    },
  },
}
</script>

<style></style>
