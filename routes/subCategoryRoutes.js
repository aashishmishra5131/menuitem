const express = require('express');
const {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    getSubCategoriesByCategoryId,
    updateSubCategory
} = require('../controllers/subCategoryController');

const router = express.Router();

router.post('/', createSubCategory);
router.get('/', getAllSubCategories);
router.get('/:id', getSubCategoryById);
router.get('/category/:categoryId', getSubCategoriesByCategoryId);
router.put('/:id', updateSubCategory);

module.exports = router;
