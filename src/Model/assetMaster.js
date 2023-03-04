const mongoose = require("mongoose");
const Objectid=mongoose.Schema.Types.ObjectId
const assetSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true },
  assetCategory: {
    type: Objectid,
    ref: "AssetCategory",
    required: true,
  },
  type: { type: String, required: true },
  make: String,
  model: String,
  description: String,
  location: String,
  isAvailable: { type: Boolean, default: true },
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
