const mongoose = require('mongoose');

const issueAssetSchema = new mongoose.Schema({
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
  issuedDate: {
    type: Date,
    required: true,
  },
});

const IssueAsset = mongoose.model('IssueAsset', issueAssetSchema);

module.exports = IssueAsset;
