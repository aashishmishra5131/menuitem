const express = require('express');
const { createCategory, getAllCategories, getCategoryById, updateCategory } = require('../controllers/categoryController');

const router = express.Router();

router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);

module.exports = router;
