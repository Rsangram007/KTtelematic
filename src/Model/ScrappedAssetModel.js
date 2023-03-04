const mongoose = require("mongoose");

const scrappedAssetSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
  reason: { type: String, required: true },
});

const ScrappedAsset = mongoose.model("ScrappedAsset", scrappedAssetSchema);

module.exports = ScrappedAsset;
