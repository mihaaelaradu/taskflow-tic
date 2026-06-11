<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useAuthStore } from './stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => !!authStore.user);

const handleLogout = async () => {
  await signOut(auth);
  router.push('/login');
};
</script>

<template>
  <div class="app">
    <header class="navbar">
      <h1>TaskFlow</h1>

      <nav>
        <RouterLink to="/">Home</RouterLink>

        <RouterLink v-if="!isAuthenticated" to="/login">
          Login
        </RouterLink>

        <RouterLink to="/tasks">Tasks</RouterLink>

        <button v-if="isAuthenticated" class="logout-btn" @click="handleLogout">
          Logout
        </button>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: Arial, sans-serif;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #1e293b;
  color: white;
}

.navbar h1 {
  margin: 0;
  font-size: 28px;
}

nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

nav a.router-link-exact-active {
  border-bottom: 2px solid #38bdf8;
  padding-bottom: 4px;
}

.logout-btn {
  background: transparent;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
}

.logout-btn:hover {
  color: #38bdf8;
}

.content {
  padding: 40px 20px;
}
</style>