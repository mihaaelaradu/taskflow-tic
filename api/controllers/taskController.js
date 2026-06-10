const db = require('../config/firebase');
const { collection, getDocs } = require('firebase/firestore');

const getAllTasks = async (req, res) => {
  try {
    const tasksCollection = collection(db, 'tasks');
    const snapshot = await getDocs(tasksCollection);

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

module.exports = {
  getAllTasks,
};