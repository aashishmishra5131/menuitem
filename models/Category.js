const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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
  taxType: {
    type: String,
  },
});

module.exports = mongoose.model("Category", categorySchema);
