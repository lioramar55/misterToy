<template>
  <div class="login-page main-layout">
    <h1>Sign up</h1>
    <form @submit.prevent="onSubmit">
      <label>
        Full name:
        <input
          type="text"
          v-model="user.fullname"
          placeholder="Enter your name"
          required
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          v-model="user.username"
          placeholder="Enter your username"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          v-model="user.password"
          placeholder="Enter password"
          required
        />
      </label>
      <button>Sign up</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'sign-up',
  data() {
    return {
      user: { fullname: '', username: '', password: '' },
    }
  },
  methods: {
    async onSubmit() {
      const addedUser = await this.$store.dispatch({
        type: 'onSignUp',
        user: { ...this.user },
      })
      console.log('addedUser', addedUser)
      if (addedUser) this.$router.push('/')
    },
  },
}
</script>

<style></style>
