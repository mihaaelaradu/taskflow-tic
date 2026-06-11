<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  console.log('Am intrat in handleLogin');
  console.log('Email:', email.value);
  console.log('Parola:', password.value);

  error.value = '';
  loading.value = true;

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('Login reusit');
    router.push('/tasks');
  } catch (err) {
    console.error('Eroare login:', err);
    error.value = 'Email sau parola incorecta';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="login">
    <h2>Login</h2>
    <p>Autentifica-te pentru a accesa aplicatia.</p>

    <form class="login-form" @submit.prevent="handleLogin">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Parola"
      />

      <p v-if="error" class="error">{{ error }}</p>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Se conecteaza...' : 'Conectare' }}
      </button>
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

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  margin: 0;
  color: #dc2626;
  font-size: 14px;
}
</style>