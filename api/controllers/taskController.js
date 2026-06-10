const db = require('../config/firebase');
const { collection, getDocs, addDoc } = require('firebase/firestore');

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

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, category } = req.body;

    if (!title || !description || !status || !priority) {
      return res.status(400).json({
        message: 'Title, description, status and priority are required',
      });
    }

    const newTask = {
      title,
      description,
      status,
      priority,
      category: category || {
        id: 'general',
        name: 'General',
      },
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    const docRef = await addDoc(collection(db, 'tasks'), newTask);

    res.status(201).json({
      id: docRef.id,
      ...newTask,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

module.exports = {
  getAllTasks,
  createTask,
};