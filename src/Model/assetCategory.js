const mongoose = require("mongoose");

const assetCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});

const AssetCategory = mongoose.model("AssetCategory", assetCategorySchema);

module.exports = AssetCategory;
