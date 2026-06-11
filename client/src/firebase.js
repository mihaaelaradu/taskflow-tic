import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBAIQQJh6uFNr6c6RF5DHcDP2WlaAbu6l4",
  authDomain: "taskflow-tic-69efd.firebaseapp.com",
  projectId: "taskflow-tic-69efd",
  storageBucket: "taskflow-tic-69efd.firebasestorage.app",
  messagingSenderId: "427562890111",
  appId: "1:427562890111:web:bb6191ffe87db2b971e04a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };