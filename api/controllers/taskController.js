const { db } = require('../config/firebase');

const getTasks = async (req, res) => {
  try {
    const snapshot = await db.collection('tasks').get();

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
    const { title, description, status, priority } = req.body;

    const newTask = {
      title,
      description,
      status,
      priority,
      createdAt: new Date().toISOString(),
      userId: req.user.uid,
    };

    const docRef = await db.collection('tasks').add(newTask);

    res.status(201).json({
      id: docRef.id,
      ...newTask,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    const taskRef = db.collection('tasks').doc(id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = {
      title,
      description,
      status,
      priority,
      updatedAt: new Date().toISOString(),
    };

    await taskRef.update(updatedTask);

    res.status(200).json({
      id,
      ...taskDoc.data(),
      ...updatedTask,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const taskRef = db.collection('tasks').doc(id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await taskRef.delete();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};