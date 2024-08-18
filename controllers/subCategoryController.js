const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');

exports.createSubCategory = async (req, res) => {
    try {
        const { categoryId, name, image, description, taxApplicability, tax } = req.body;

        // Check if the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Use the category's tax applicability and tax as defaults if not provided
        const subCategory = new SubCategory({
            categoryId,
            name,
            image,
            description,
            taxApplicability: taxApplicability !== undefined ? taxApplicability : category.taxApplicability,
            tax: tax !== undefined ? tax : category.tax,
        });

        await subCategory.save();
        res.status(201).json(subCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('categoryId', 'name');
        res.json(subCategories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id).populate('categoryId', 'name');
        if (!subCategory) {
            return res.status(404).json({ error: 'SubCategory not found' });
        }
        res.json(subCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSubCategoriesByCategoryId = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({ categoryId: req.params.categoryId });
        res.json(subCategories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subCategory) {
            return res.status(404).json({ error: 'SubCategory not found' });
        }
        res.json(subCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
