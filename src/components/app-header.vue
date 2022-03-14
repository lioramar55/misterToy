<template>
  <header>
    <div class="main-header main-layout">
      <div class="logo">
        <router-link to="/"><h1>misterToy</h1></router-link>
      </div>
      <nav>
        <ul>
          <li><router-link to="/shop">Toy Store</router-link></li>
          <li><router-link to="/">Profile</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'app-header',
}
</script>

<style></style>
