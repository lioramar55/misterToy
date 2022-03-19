<template>
  <div class="main-layout">
    <h1>Welcome {{ user }}</h1>
    <router-link to="/toy" class="main"
      >Visit our shop</router-link
    >
  </div>
</template>
<script>
export default {
  name: 'home',
  computed: {
    user() {
      const user = this.$store.getters.user
      return user ? user.fullname : 'guest'
    },
  },
}
</script>

<style></style>
