const express = require('express');
const {
    createItem,
    getAllItems,
    getItemById,
    getItemsBySubCategoryId,
    updateItem,
    searchItemsByName,
} = require('../controllers/itemController');

const router = express.Router();

router.post('/', createItem);
router.get('/', getAllItems);
router.get('/:id', getItemById);
router.get('/subcategory/:subCategoryId', getItemsBySubCategoryId);
router.put('/:id', updateItem);
router.get('/search', searchItemsByName);

module.exports = router;
