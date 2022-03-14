<template>
  <header>
    <div class="main-header">
      <div class="logo">
        <router-link to="/"><h1>misterToy</h1></router-link>
      </div>
    </div>
    <nav>
      <router-link to="/shop">Toy Store</router-link>
      <router-link to="/">Profile</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'app-header',
}
</script>

<style></style>
