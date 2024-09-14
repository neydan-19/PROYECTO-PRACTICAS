const express = require('express');
const { createTask, getAllTasks, getTaskId, deleteTask,updateTask, getTaskByUser, getTaskByCategory, getAll} = require('../controllers/taskController');

const router = express.Router();

// Crear una nueva tarea
router.post('/', createTask);

// Obtener todas las tareas
router.get('/', getAllTasks);

// Obtener una tarea por ID
router.get('/:id', getTaskId);

router.put('/:id', updateTask);

// Eliminar una tarea por ID
router.delete('/:id', deleteTask);

//FILTRAR TASK POR USUARIO
router.get('/user/:userId', getTaskByUser)

//FILTER TASK BY CATEGORY
router.get('/category/:categoryId', getTaskByCategory)

router.get('/task/tasks',getAll);


module.exports = router;
