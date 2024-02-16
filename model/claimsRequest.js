const mongoose = require('mongoose');
const travelClaimSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    claimName: {type:String,default:"TRAVEL ALLOWANCE"},
    claimAmount:{type:Number,default:0} ,
    date: { type: Date, default: Date.now },
    status: { type: String,enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    approver: [
        {
            approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            role: { type: String, required: true, enum: ['MANAGER', 'HR', 'DIRECTOR'] },
        }
    ],
    needApprovalFrom: [{ type: String, enum: ['MANAGER', 'HR', 'DIRECTOR'] }],

  },{
    versionKey: false,
    timestamps: true
});

const TravelClaims = mongoose.model('ClaimsRequest', travelClaimSchema);

module.exports = TravelClaims;