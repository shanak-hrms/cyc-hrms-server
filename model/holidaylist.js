const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
  name: { type: String, required: true ,unique: true,lowercase:true},
  date: { type: Date, required: true },
  description: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true }
});

module.exports = mongoose.model("Holiday", holidaySchema);
