<template>
  <section class="home">
    <h2>Bine ai venit in TaskFlow</h2>
    <p class="intro">
      TaskFlow este o aplicatie simpla in care poti naviga intre pagini,
      te poti autentifica si iti poti organiza task-urile.
    </p>

    <div class="home-cards">
      <article class="card">
        <h3>Login rapid</h3>
        <p>Acceseaza pagina de login pentru a introduce datele utilizatorului.</p>
      </article>

      <article class="card">
        <h3>Task-uri clare</h3>
        <p>Vezi task-urile importante, cele in progres si cele finalizate.</p>
      </article>

      <article class="card">
        <h3>Navigare usoara</h3>
        <p>Foloseste meniul de sus pentru a trece rapid intre paginile aplicatiei.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.home {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h2 {
  margin-bottom: 12px;
  color: #1f2937;
}

.intro {
  margin-bottom: 24px;
  color: #4b5563;
  line-height: 1.6;
}

.home-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.card {
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 18px;
}

.card h3 {
  margin-bottom: 10px;
  color: #111827;
  font-size: 18px;
}

.card p {
  color: #4b5563;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .home-cards {
    grid-template-columns: 1fr;
  }
}
</style>