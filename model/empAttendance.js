const mongoose = require('mongoose');

const empAttendanceSchema = new mongoose.Schema({
    emp_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String },
    status: { type: String },
    clock_in: { type: String },
    clock_out: { type: String },
});

module.exports = mongoose.model('EmpAttendance', empAttendanceSchema);