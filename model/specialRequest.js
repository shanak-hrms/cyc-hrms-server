const mongoose = require('mongoose');

const specialRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  level: { type: String, enum: ['Line Manager', 'Human Manager', 'Director'], required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, {
  versionKey: false,
  timestamps: true,
});

const SpecialRequest = mongoose.model('SpecialRequest', specialRequestSchema);

module.exports = SpecialRequest;
