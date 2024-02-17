const mongoose = require('mongoose');

const salaryStructureSchema = new mongoose.Schema({
    employeeId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true },
    basicSalary: { type: Number, required: true},
    hraPercentage: {type: Number, default: 40},
    daPercentage: {type: Number, default: 22},
    travelAllowance: {type: Number,default: 0},
    specialAllowance: {
        name: { type: String },
        value: {
            type: Number,
            default: 0
        }
    },
    ptaxDeduction: {type: Number,default: 180,description: '180 RS PER PERSON'},
    pfPercentage: {type: Number,default: 12,description: 'FOR WHOM APPLICABLE - 12% OF BASIC both for employee and employer'},
    esiPercentage: { type: Number,default: 3.25,description: 'ESI (Employee State Insurance) deduction rate, calculated as 3.25% of the Total Gross Pay'
    },
},
    {
        versionKey: false,
        timestamps: true
    });


const Payroll = mongoose.model('salaryStructure', salaryStructureSchema);

module.exports = Payroll;
