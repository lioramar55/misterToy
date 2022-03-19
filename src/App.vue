<template>
  <section class="app-container">
    <app-header @logout="logoutUser"></app-header>
    <div class="main-app">
      <router-view />
    </div>
    <app-footer></app-footer>
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'
import userService from './services/user.service'
export default {
  name: 'app',
  components: {
    appHeader,
    appFooter,
  },
  created() {
    this.$store.dispatch({ type: 'loadApp' })
  },
  methods: {
    logoutUser() {
      this.$store.dispatch({ type: 'logout' })
    },
  },
}
</script>

<style></style>
