const mongoose = require('mongoose');
const travelClaimSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    claimName: {type:String,default:"TRAVEL ALLOWANCE"},
    claimAmount:{type:Number,default:0} ,
    date: { type: Date, default: Date.now },
    status: { type: String,enum: ['Pending', 'Approved', 'Rejected', 'No Request'], default: 'No Request' },
    approver: [
        {
            approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            role: { type: String, required: true, enum: ['Line Manager', 'HR', 'Director'] },
        }
    ],
    needApprovalFrom: [{ type: String, enum: ['Line Manager', 'HR', 'Director'] }],

  },{
    versionKey: false,
    timestamps: true
});

const TravelClaims = mongoose.model('ClaimsRequest', travelClaimSchema);

module.exports = TravelClaims;