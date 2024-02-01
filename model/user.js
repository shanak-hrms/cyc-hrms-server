const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, lowercase: true },
    password: { type: String, required: true },
    dateOfJoining: { type: Date, required: true },
    probationStatus: { type: Boolean, default: true },
    branch: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    role: { type: String, enum: ["EMPLOYEE", "HR", "DIRECTOR", "LINE MANAGER"], default: "EMPLOYEE", },
    address: { type: String },
    mobile: { type: String },
    isActive: { type: Boolean, default: true },
    avatar: {type: String},
    token: {type: String}
},{
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
    const token = jwt.sign({ _id: user._id.toString(),username: user.name,
        role: user.role,
        mobile: user.mobile,
        email: user.email, }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE
    })
    user.token =token
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
