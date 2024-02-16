const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    sequenceName: { type: String, required: true,unique:true },
    sequenceValue: { type: Number, default: 0 }
});

const Sequence = mongoose.model('IdSequence', sequenceSchema);
module.exports = Sequence;
