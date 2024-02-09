const mongoose = require('mongoose');

const salesInductionSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  fileDescription: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
},{
    versionKey: false,
    timestamps: true
});

const salesInduction = mongoose.model('salesInduction', salesInductionSchema);

module.exports = salesInduction;
