const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    month: { type: String, required: true, enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
    year: { type: String, required: true },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    basic: {
        type: Number,
        required: true
    },
    hra: {
        type: Number,
        default: 0
    },
    da: {
        type: Number,
        default: 0
    },
    travelAllowanceDeduction: {
        type: Number,
        default: 0
    },
    specialAllowance: {
        name: { type: String },
        value: {
            type: Number,
            default: 0
        }
    },
    ptax: {
        type: Number,
        default: 180,
        description: '180 RS PER PERSON'
    },
    netPay: {
        type: Number,
        required: true
    },
    totalDeductions: {
        type: Number,
        required: true
    },
    esiDeduction: {
        type: Number,
        required: true
    },
    pfDeductionEmployer: {
        type: Number,
        required: true
    },
    pfDeductionEmployee: {
        type: Number,
        required: true
    },
    totalGrossPay: {
        type: Number,
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    });


const Payroll = mongoose.model('Payroll', payrollSchema);

module.exports = Payroll;
