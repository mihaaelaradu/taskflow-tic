<template>
  <section class="login">
    <h2>Login</h2>
    <p>Autentifica-te pentru a accesa aplicatia.</p>

    <form class="login-form">
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Parola" />
      <button type="submit">Conectare</button>
    </form>
  </section>
</template>

<style scoped>
.login {
  max-width: 420px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h2 {
  margin-bottom: 10px;
  color: #1f2937;
}

p {
  margin-bottom: 20px;
  color: #4b5563;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
}

button {
  padding: 12px;
  background-color: #1e293b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>