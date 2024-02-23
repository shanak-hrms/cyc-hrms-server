const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User",default:null },
    name: { type: String, required: true },
    empCode: { type: String, required: true },
    email: { type: String, lowercase: true,required: true },
    officialEmail: { type: String,lowercase: true },
    password: { type: String, required: true },
    dateOfJoining: { type: Date, required: true },
    empStatus: { type: String, enum: ["PROBATION", "PERMANENT"], required: true },
    branch: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    role: { type: String, enum: ["EMPLOYEE", "HR", "DIRECTOR", "MANAGER"], default: "EMPLOYEE", },
    employeesAssign: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    assetsAssign: [{
        name:{type:String},
        date:{type:String},
        assetsModel:{type:String},
        assetsId:{type:String}
    }],
    address: { type: String },
    uanNumber: { type: String },
    bankName: { type: String, required: true },
    bankAccount: { type: String, required: true },
    IFSC: { type: String, required: true },
    esic: { type: String },
    mobile: { type: String },
    isActive: { type: Boolean, default: true },
    avatar: { type: String },
    token: { type: String },
    agreedToAgreement:{type:Boolean,default:false},
    privilegeLeaveBalance: { type: Number, default: 0 },
    medicalLeaveBalance: { type: Number, default: 0},
    totalLeaveAccrued: { type: Number, default: 0 },
}, {
    versionKey: false,
    timestamps: true
});

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString(), username: user.name,
        role: user.role,
        mobile: user.mobile,
        email: user.email,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE
    })
    user.token = token
    await user.save()
    return token
}

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next();
})
const User = mongoose.model('User', userSchema);

module.exports = User;
