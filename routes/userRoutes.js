const express = require('express');
const { createUser, getAllUsers, getUserById, deleteUser, updateUser, getUserByName } = require('../controllers/userController');

const router = express.Router();

// Crear un nuevo usuario
router.post('/', createUser);

// Obtener todos los usuarios
router.get('/', getAllUsers);

// Obtener un usuario por ID
router.get('/:id', getUserById);

router.put('/:id', updateUser);
// Eliminar un usuario por ID
router.delete('/:id', deleteUser);

router.get('/name/:name', getUserByName);

module.exports = router;
