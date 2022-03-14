<template>
  <section class="app-container">
    <app-header></app-header>
    <router-view />
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
}
</script>

<style></style>
