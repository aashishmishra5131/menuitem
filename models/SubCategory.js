const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  taxApplicability: {
    type: Boolean,
    default: false,
  },
  tax: {
    type: Number,
  },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
