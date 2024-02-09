const mongoose = require('mongoose');

const hrInductionSchema = new mongoose.Schema({
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

const hrInduction = mongoose.model('hrInduction', hrInductionSchema);

module.exports = hrInduction;
