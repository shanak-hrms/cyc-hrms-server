const mongoose = require('mongoose');

const empLeaveSchema = ({
    emp_id: String,
    name: String,
    leave_type: String,
    start_date: Date,
    end_date: Date,
    leave_reason: String,
    status: { type: String, default: "Pending" }
})

module.exports = mongoose.model("EmpLeave", empLeaveSchema)