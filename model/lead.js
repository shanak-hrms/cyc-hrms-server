const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  leadName: { type: String, required: true },
  leadType: { type: String, required: true,enum: ["Corporate", "TMC"] },
  leadStatus: { type: String, required: true, enum: ["Closed", "Open", "Cold", "Hot"], default: "Open" },
  openDate: { type: Date, required: true },
  closeDate: { type: Date, required: false },
  leadDesc: { type: String, required: true },
  business: {
    type: {type: String, required: false,enum: ["Event", "Room"]},
    source: { type: String, required: false,enum:["Direct", "Vendor"] },
    vendorName: { type: String, required: false },
    vendorAddress: { type: String, required: false },
    businessValueBooked: { type: Number, required: false },
    businessCost: { type: Number, required: false },
    profitAmount: { type: Number, required: false }
  }
});

module.exports = mongoose.model("Lead", leadSchema);
