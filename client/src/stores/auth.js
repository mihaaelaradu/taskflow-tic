import { defineStore } from 'pinia';
import { ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const authReady = ref(false);

  const initAuth = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
      authReady.value = true;
      console.log('User din Firebase:', firebaseUser);
    });
  };

  return {
    user,
    authReady,
    initAuth,
  };
});