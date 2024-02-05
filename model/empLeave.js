const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    month: { type: String, required: true, enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    dates: [{ type: Date, required: true }],
    leaveType: { type: String, required: true, enum: ['Sick', 'Privilege', 'LWP'] },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'No Request'], default: 'Pending' },
    approver: [
        {
            approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
            role: { type: String, required: true, enum: ['Line Manager', 'HR', 'Director'] },
        }
    ],
    approvedDates: [{ type: Date }],
    rejectedDates: [{ type: Date }],
    needApprovalFrom: [{ type: String, enum: ['Line Manager', 'HR', 'Director'] }],
},{
    versionKey: false,
    timestamps: true
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
