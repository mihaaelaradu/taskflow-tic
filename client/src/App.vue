<template>
  <div class="app">
    <header class="header">
      <h1 class="logo">TaskFlow</h1>

      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/tasks">Tasks</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f9fafb;
  color: #111827;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background-color: #1f2937;
  color: white;
}

.logo {
  font-size: 24px;
  margin: 0;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

.nav a.router-link-active {
  text-decoration: underline;
}

.main-content {
  padding: 32px;
}
</style>