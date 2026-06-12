const { db } = require('./config/firebase');

const titles = [
  'Finalizeaza proiectul la TIC',
  'Invata Vue Router',
  'Pregateste pagina de login',
  'Testeaza backend-ul Express',
  'Adauga validari in formular',
  'Imbunatateste layout-ul responsive',
  'Conecteaza frontend la API',
  'Verifica regulile Firestore',
  'Adauga store Pinia pentru task-uri',
  'Testeaza CRUD complet',
];

const descriptions = [
  'Implementare si verificare functionalitate principala.',
  'Revizuire concepte si aplicare in proiect.',
  'Corectare bug-uri si testare pe mai multe pagini.',
  'Pregatire pentru prezentarea finala.',
  'Adaugare de validari si mesaje de eroare.',
  'Refactorizare pentru cod mai clar si mai organizat.',
  'Testare completa pentru create, read, update si delete.',
  'Verificare integrare Firebase Authentication si Firestore.',
];

const statuses = ['todo', 'in-progress', 'done'];
const priorities = ['low', 'medium', 'high'];

const categories = [
  { id: 'academic', name: 'Facultate' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'testing', name: 'Testare' },
  { id: 'learning', name: 'Invatare' },
];

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomTask(index) {
  const now = new Date().toISOString();

  return {
    title: getRandomItem(titles),
    description: getRandomItem(descriptions),
    status: getRandomItem(statuses),
    priority: getRandomItem(priorities),
    category: getRandomItem(categories),
    metadata: {
      createdAt: now,
      updatedAt: now,
    },
  };
}

async function seedTasks(count = 15) {
  try {
    console.log(`Se adauga ${count} task-uri...`);

    const tasksCollection = db.collection('tasks');
    const tasks = [];

    for (let i = 0; i < count; i++) {
      tasks.push(generateRandomTask(i));
    }

    const promises = tasks.map((task) => tasksCollection.add(task));
    await Promise.all(promises);

    console.log(`S-au adaugat cu succes ${count} task-uri.`);

    const statusCount = {
      todo: 0,
      'in-progress': 0,
      done: 0,
    };

    const priorityCount = {
      low: 0,
      medium: 0,
      high: 0,
    };

    tasks.forEach((task) => {
      statusCount[task.status]++;
      priorityCount[task.priority]++;
    });

    console.log('\nRezumat statusuri:');
    console.log(`- todo: ${statusCount.todo}`);
    console.log(`- in-progress: ${statusCount['in-progress']}`);
    console.log(`- done: ${statusCount.done}`);

    console.log('\nRezumat prioritati:');
    console.log(`- low: ${priorityCount.low}`);
    console.log(`- medium: ${priorityCount.medium}`);
    console.log(`- high: ${priorityCount.high}`);

    console.log('\nExemple de task-uri:');
    tasks.slice(0, 5).forEach((task, index) => {
      console.log(`${index + 1}. ${task.title} [${task.status}] [${task.priority}]`);
    });
  } catch (error) {
    console.error('Eroare la seedTasks:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  const count = process.argv[2] ? parseInt(process.argv[2], 10) : 15;

  seedTasks(count)
    .then(() => {
      console.log('\nSeed complet.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed esuat:', error);
      process.exit(1);
    });
}

module.exports = { seedTasks, generateRandomTask };