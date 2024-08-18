const Item = require('../models/Item');
const SubCategory = require('../models/SubCategory');

exports.createItem = async (req, res) => {
    try {
        const { subCategoryId, name, image, description, taxApplicability, tax, baseAmount, discount } = req.body;

        // check if the sub-category exists
        const subCategory = await SubCategory.findById(subCategoryId);
        if (!subCategory) {
            return res.status(404).json({ error: 'SubCategory not found' });
        }

        // use the sub-category's tax applicability and tax as defaults if not provided
        const item = new Item({
            subCategoryId,
            name,
            image,
            description,
            taxApplicability: taxApplicability !== undefined ? taxApplicability : subCategory.taxApplicability,
            tax: tax !== undefined ? tax : subCategory.tax,
            baseAmount,
            discount,
        });

        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find().populate('subCategoryId', 'name');
        res.json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('subCategoryId', 'name');
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getItemsBySubCategoryId = async (req, res) => {
    try {
        const items = await Item.find({ subCategoryId: req.params.subCategoryId });
        res.json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.searchItemsByName = async (req, res) => {
    try {
        const items = await Item.find({ name: { $regex: req.query.name, $options: 'i' } });
        res.json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

