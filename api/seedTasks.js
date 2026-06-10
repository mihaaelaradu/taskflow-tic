const db = require('./config/firebase');
const { collection, addDoc } = require('firebase/firestore');

const tasks = [
  {
    title: 'Finalizeaza proiectul la TIC',
    description: 'Configurare backend si conectare Firestore',
    status: 'in-progress',
    priority: 'high',
    category: {
      id: 'academic',
      name: 'Facultate',
    },
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    title: 'Invata baza din Vue Router',
    description: 'Intelegerea rutelor si navigarii in aplicatie',
    status: 'todo',
    priority: 'medium',
    category: {
      id: 'learning',
      name: 'Invatare',
    },
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    title: 'Pregateste pagina de login',
    description: 'Creare interfata pentru autentificare',
    status: 'done',
    priority: 'low',
    category: {
      id: 'frontend',
      name: 'Frontend',
    },
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
];

const seedTasks = async () => {
  try {
    for (const task of tasks) {
      await addDoc(collection(db, 'tasks'), task);
    }

    console.log('Tasks added successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding tasks:', error);
    process.exit(1);
  }
};

seedTasks();