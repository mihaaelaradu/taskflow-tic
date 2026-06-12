const express = require('express');
const router = express.Router();

const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const verifyToken = require('../middleware/authMiddleware');
const { taskValidation } = require('../validators/taskValidator');
const { handleValidation } = require('../middleware/handleValidation');

router.get('/', getTasks);
router.post('/', verifyToken, taskValidation, handleValidation, createTask);
router.put('/:id', verifyToken, taskValidation, handleValidation, updateTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;