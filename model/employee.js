const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    emp_id: String,
    name: String,
    dateOfBirth: String,
    email: String,
    phone: Number,
    gender: String,
    password: String,
    address: String,
    role: { type: String, default: "EMPLOYEE" },
    branch: String,
    department: String,
    designation: String,
    dateOfJoin: String,
    certificate: String,
    resume: String,
    photo: String,
    accHolderName: String,
    bankName: String,
    bankBranch: String,
    accNumber: String,
    bankIndentifierCode: String,
    taxPayerId: String
});

module.exports = mongoose.model('Employee', employeeSchema);
