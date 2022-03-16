<template>
  <section class="app-container">
    <app-header></app-header>
    <div class="main-app">
      <router-view />
    </div>
    <app-footer></app-footer>
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'
export default {
  name: 'app',
  components: {
    appHeader,
    appFooter,
  },
  created() {
    this.$store.dispatch({ type: 'loadApp' })
  },
}
</script>

<style></style>
