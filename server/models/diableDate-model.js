const mongoose = require('mongoose');

const DisabledDateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDelete: {
    type: String,
    default: false
  }
});

const DisabledDate = mongoose.model('DisabledDate', DisabledDateSchema);

module.exports = DisabledDate;
