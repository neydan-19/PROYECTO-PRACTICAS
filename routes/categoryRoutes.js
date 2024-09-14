const express = require('express');
const { createCategory, getAllCategory, getCategoryId, deleteCategoryId,updateCategory } = require('../controllers/categoryController');

const router = express.Router();

// Crear una nueva categoría
router.post('/', createCategory);

// Obtener todas las categorías
router.get('/', getAllCategory);

// Obtener una categoría por ID
router.get('/:id', getCategoryId);

router.put('/:id', updateCategory);

// Eliminar una categoría por ID
router.delete('/:id', deleteCategoryId);

module.exports = router;
