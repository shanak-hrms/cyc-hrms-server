const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    emp_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, lowercase: true },
    password: { type: String, required: true },
    dateOfJoin: { type: Date, required: true },
    branch: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    role: { type: String, default: "EMPLOYEE" },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
