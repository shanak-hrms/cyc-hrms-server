const mongoose = require('mongoose');

const compTimeSchema = new mongoose.Schema({
    employeeId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
    dateOfRequest: {type: Date,required: true},
    dateOfUsage: {type: Date },
    approved: {type: Boolean, default: false }
});

const CompTime = mongoose.model('CompTime', compTimeSchema);

module.exports = CompTime;
