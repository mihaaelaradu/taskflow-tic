<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '../firebase';

const tasks = ref([]);
const loading = ref(true);
const error = ref('');
const successMessage = ref('');
const priority = ref('medium');

const title = ref('');
const description = ref('');
const status = ref('todo');

const isEditing = ref(false);
const editingTaskId = ref(null);

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

const createTask = async () => {
  error.value = '';
  successMessage.value = '';

  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('Trebuie sa fii autentificat pentru a adauga un task.');
    }

    const token = await user.getIdToken();

    const response = await fetch('http://localhost:5001/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        status: status.value,
        priority: priority.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Task-ul nu a putut fi adaugat.');
    }

    successMessage.value = 'Task adaugat cu succes.';
    title.value = '';
    description.value = '';
    status.value = 'todo';
    priority.value = 'medium';

    await fetchTasks();
  } catch (err) {
    error.value = err.message;
  }
};

const deleteTask = async (taskId) => {
  error.value = '';
  successMessage.value = '';

  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('Trebuie sa fii autentificat pentru a sterge un task.');
    }

    const token = await user.getIdToken();

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

const startEditTask = (task) => {
  error.value = '';
  successMessage.value = '';

  isEditing.value = true;
  editingTaskId.value = task.id;

  title.value = task.title;
  description.value = task.description;
  status.value = task.status;
  priority.value = task.priority;
};

const cancelEdit = () => {
  isEditing.value = false;
  editingTaskId.value = null;

  title.value = '';
  description.value = '';
  status.value = 'todo';
  priority.value = 'medium';

  error.value = '';
  successMessage.value = '';
};

const updateTask = async () => {
  error.value = '';
  successMessage.value = '';

  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('Trebuie sa fii autentificat pentru a edita un task.');
    }

    const token = await user.getIdToken();

    const response = await fetch(`http://localhost:5001/api/tasks/${editingTaskId.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        status: status.value,
        priority: priority.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Task-ul nu a putut fi actualizat.');
    }

    successMessage.value = 'Task actualizat cu succes.';
    cancelEdit();
    await fetchTasks();
  } catch (err) {
    error.value = err.message;
  }
};

const handleSubmit = async () => {
  if (!title.value.trim() || !description.value.trim()) {
    error.value = 'Titlul si descrierea sunt obligatorii.';
    return;
  }

  if (isEditing.value) {
    await updateTask();
  } else {
    await createTask();
  }
};

onMounted(() => {
  fetchTasks();
});

const formatStatus = (status) => {
  if (status === 'todo') return 'De facut';
  if (status === 'in-progress') return 'In progres';
  if (status === 'done') return 'Finalizat';
  return status;
};

const statusClass = (status) => {
  if (status === 'todo') return 'badge-todo';
  if (status === 'in-progress') return 'badge-progress';
  if (status === 'done') return 'badge-done';
  return '';
};
</script>

<template>
  <section class="tasks">
    <div class="tasks-header">
      <div>
        <h2>Tasks</h2>
        <p>Mai jos este lista task-urilor tale curente.</p>
      </div>

      <button class="refresh-btn" @click="fetchTasks">
        Refresh
      </button>
    </div>

    <form class="task-form" @submit.prevent="handleSubmit">
      <h3>{{ isEditing ? 'Editeaza task' : 'Adauga task nou' }}</h3>

      <input
        v-model="title"
        type="text"
        placeholder="Titlu task"
      />

      <textarea
        v-model="description"
        placeholder="Descriere task"
        rows="4"
      ></textarea>

      <select v-model="status">
        <option value="todo">De facut</option>
        <option value="in-progress">In progres</option>
        <option value="done">Finalizat</option>
      </select>

      <select v-model="priority">
        <option value="low">Prioritate mica</option>
        <option value="medium">Prioritate medie</option>
        <option value="high">Prioritate mare</option>
      </select>

      <button type="submit" class="add-btn">
        {{ isEditing ? 'Salveaza modificarile' : 'Adauga task' }}
      </button>

      <button
        v-if="isEditing"
        type="button"
        class="cancel-btn"
        @click="cancelEdit"
      >
        Anuleaza editarea
      </button>

    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="loading">Se incarca task-urile...</p>
    <p v-else-if="error" class="error">{{ error }}</p>


    <div v-else class="task-list">
      <article class="task-card" v-for="task in tasks" :key="task.id">
        <div>
          <h3>{{ task.title }}</h3>
          <p class="description">{{ task.description }}</p>

          <span class="badge" :class="statusClass(task.status)">
            {{ formatStatus(task.status) }}
          </span>

          <p class="priority">Prioritate: {{ task.priority }}</p>


          <div class="task-actions">
            <button
              class="edit-btn"
              @click="startEditTask(task)"
            >
              Editeaza
            </button>

            <button
              class="delete-btn"
              @click="deleteTask(task.id)"
            >
              Sterge
            </button>
          </div>

        </div>
      </article>
    </div>

  </section>
</template>

<style scoped>
.tasks {
  max-width: 750px;
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

.task-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background-color: #f8fafc;
}

.task-form h3 {
  margin: 0;
  color: #111827;
}

.task-form input,
.task-form textarea,
.task-form select {
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
}

.task-form input:focus,
.task-form textarea:focus,
.task-form select:focus {
  outline: none;
  border-color: #2563eb;
}

.add-btn {
  padding: 12px 16px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.add-btn:hover {
  background-color: #1d4ed8;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.task-card {
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background-color: #f8fafc;
}

.task-card h3 {
  margin: 0 0 10px;
  color: #111827;
  font-size: 18px;
}

.badge {
  display: inline-block;
  padding: 6px 10px;
  background-color: #dbeafe;
  color: #1d4ed8;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

.description {
  margin: 0 0 10px;
  color: #4b5563;
  line-height: 1.5;
}

.error {
  color: #dc2626;
  font-weight: 600;
}

.success {
  color: #15803d;
  font-weight: 600;
}

.badge-todo {
  background-color: #fef3c7;
  color: #92400e;
}

.badge-progress {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.badge-done {
  background-color: #dcfce7;
  color: #166534;
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}

.tasks-header p {
  margin-bottom: 0;
}

.refresh-btn {
  padding: 10px 16px;
  background-color: #1e293b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.refresh-btn:hover {
  background-color: #334155;
}

@media (max-width: 768px) {
  .tasks-header {
    flex-direction: column;
    align-items: stretch;
  }

  .refresh-btn,
  .add-btn {
    width: 100%;
  }
}

.priority {
  margin: 8px 0 12px;
  font-weight: 600;
  color: #475569;
}

.task-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.delete-btn {
  padding: 10px 14px;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.delete-btn:hover {
  background-color: #b91c1c;
}

.edit-btn {
  padding: 10px 14px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 10px;
}

.edit-btn:hover {
  background-color: #1d4ed8;
}

.cancel-btn {
  padding: 12px 16px;
  background-color: #e5e7eb;
  color: #111827;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.cancel-btn:hover {
  background-color: #d1d5db;
}

</style>