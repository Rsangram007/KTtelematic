const mongoose = require('mongoose');

const returnAssetSchema = new mongoose.Schema({
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});

const ReturnAsset = mongoose.model('ReturnAsset', returnAssetSchema);

module.exports = ReturnAsset;
