<script setup>
const tasks = [
  { id: 1, title: 'Finalizeaza proiectul la TIC', status: 'Important' },
  { id: 2, title: 'Invata baza din Vue Router', status: 'In progres' },
  { id: 3, title: 'Pregateste pagina de login', status: 'Finalizat' },
]
</script>

<template>
  <section class="tasks">
    <h2>Tasks</h2>
    <p>Mai jos este lista task-urilor tale curente.</p>

    <div class="task-list">
      <article class="task-card" v-for="task in tasks" :key="task.id">
        <div>
          <h3>{{ task.title }}</h3>
          <span class="badge">{{ task.status }}</span>
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
</style>