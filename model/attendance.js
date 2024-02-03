const mongoose = require('mongoose');

const MonthlyAttendanceSchema = new mongoose.Schema({
  month: { type: String, required: true, enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
  date: { type: Date, required: true, },
  clockIn: { type: Date, default:null },
  clockOut: { type: Date, },
  markedWithin5Km: { type: Boolean, default: false, },
  regularizationRequest: {
    days: { type: Number, default: 0, },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'No Request'], default: 'No Request', },
    approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  },
},{
  versionKey: false,
  timestamps: true
});

const MonthlyAttendance = mongoose.model('MonthlyAttendance', MonthlyAttendanceSchema);

module.exports = MonthlyAttendance;
