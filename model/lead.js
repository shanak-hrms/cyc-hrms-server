const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    leadName: { type: String, required: true },
    leadType: { type: String, required: false },
    leadStatus: { type: String, required: true, default: "Closed" },
    openDate: { type: Date, required: true },
    closeDate: { type: Date, required: false },
    leadDesc: { type: String, required: true }, 
    businessType: { type: String, required: true },
    businessFrom: { type: String, required: true },
    businessVal: { type: Number, required: false },
    businessCost: { type: Number, required: false },
    profitAmount: { type: Number, required: false }
})


module.exports = mongoose.model("Lead", leadSchema);