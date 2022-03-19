<template>
  <header class="main-layout">
    <div class="main-header">
      <div class="logo">
        <router-link to="/"><h1>misterToy</h1></router-link>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/toy">Toy Store</router-link>
          </li>
          <li>
            <router-link to="/dashboard"
              >Dashboard</router-link
            >
          </li>
          <li v-if="!user">
            <router-link to="/login">Login</router-link> /
            <router-link to="/signup">Register</router-link>
          </li>
          <li v-else>
            <a href="#" @click="$emit('logout')"
              >Logout {{ user }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'app-header',
  computed: {
    user() {
      const user = this.$store.getters.user
      return user ? user.fullname : ''
    },
  },
}
</script>

<style></style>
