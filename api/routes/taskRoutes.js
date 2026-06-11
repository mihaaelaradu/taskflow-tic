const express = require('express');
const router = express.Router();
const { getAllTasks, createTask } = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', getAllTasks);
router.post('/', verifyToken, createTask);

module.exports = router;