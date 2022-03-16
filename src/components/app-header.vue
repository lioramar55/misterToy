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
