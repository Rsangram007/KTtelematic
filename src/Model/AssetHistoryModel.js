const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetHistorySchema = new Schema({
  asset: {
    type: Schema.Types.ObjectId,
    ref: 'Asset',
    required: true
  },
  action: {
    type: String,
    enum: ['purchase', 'assign', 'return', 'scrap'],
    required: true
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  reason: {
    type: String
  }
});

module.exports = mongoose.model('AssetHistory', AssetHistorySchema);
