<template>
  <div class="app">
    <header class="navbar">
      <h1>TaskFlow</h1>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/tasks">Tasks</RouterLink>
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

.content {
  padding: 40px 20px;
}
</style>