<script setup>
import { ref, onMounted } from 'vue';

const tasks = ref([]);
const loading = ref(true);
const error = ref('');

const fetchTasks = async () => {
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

  .refresh-btn {
    width: 100%;
  }
}
</style>