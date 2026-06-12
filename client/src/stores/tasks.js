import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../firebase';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([]);
  const loading = ref(false);
  const error = ref('');
  const successMessage = ref('');

  const fetchTasks = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await fetch('http://localhost:5001/api/tasks');

      if (!response.ok) {
        throw new Error('Nu s-au putut incarca task-urile');
      }

      const data = await response.json();
      tasks.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const getToken = async () => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('Trebuie sa fii autentificat.');
    }

    return await user.getIdToken();
  };

  const createTask = async (payload) => {
    error.value = '';
    successMessage.value = '';

    try {
      const token = await getToken();

      const response = await fetch('http://localhost:5001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Task-ul nu a putut fi adaugat.');
      }

      successMessage.value = 'Task adaugat cu succes.';
      await fetchTasks();
    } catch (err) {
      error.value = err.message;
    }
  };

  const updateTask = async (taskId, payload) => {
    error.value = '';
    successMessage.value = '';

    try {
      const token = await getToken();

      const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Task-ul nu a putut fi actualizat.');
      }

      successMessage.value = 'Task actualizat cu succes.';
      await fetchTasks();
    } catch (err) {
      error.value = err.message;
    }
  };

  const deleteTask = async (taskId) => {
    error.value = '';
    successMessage.value = '';

    try {
      const token = await getToken();

      const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Task-ul nu a putut fi sters.');
      }

      successMessage.value = 'Task sters cu succes.';
      await fetchTasks();
    } catch (err) {
      error.value = err.message;
    }
  };

  const clearMessages = () => {
    error.value = '';
    successMessage.value = '';
  };

  return {
    tasks,
    loading,
    error,
    successMessage,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    clearMessages,
  };
});