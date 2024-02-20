const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {getNextSequenceValue}=require("../services/empNextId")

exports.findUserList = async (req, res) => {
    try {
        const result = await User.find();
        res.status(200).json({
            userData: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.register = async (req, res) => {
    try {
        const { email,empCode } = req.body
        const nextEmpId = await getNextSequenceValue("Employee");
        if (!nextEmpId) {
            throw new Error("Something went wrong while getting next Emp ID");
        }
        const empId = 'CYCEMP' + String(nextEmpId).padStart(4, '0');
        let isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error("User already registered. Please sign In");
        }
        let isEmpCodeExist = await User.findOne({ empCode:empId });
        if(isEmpCodeExist){
            throw new Error("Employee ID already registered. Please choose different Emp ID");
        }
        let empObj=req.body
        empObj.empCode=empId
        const user = new User(empObj);
        if (!user) {
            throw new Error("User not created. Something went wrong")
        }
        const token = await user.generateAuthToken()
        const result = await user.save();
        res.status(201).json({
            newUser: result,
            token
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.Login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                msg: 'Invalid Credentials',
            });
        }
        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) {
            return res.status(401).json({
                msg: 'Invalid Credentials',
            });
        }

        const token = await user.generateAuthToken()
        res.status(200).json({
            name: user.name,
            role: user.role,
            phone: user.phone,
            email: user.email,
            empStatus:user.empStatus,
            userId:user._id,
            token: token,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.deleteUserReocrds = async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await User.deleteOne({ _id: userId });

        if (result.deletedCount === 1) {
            res.status(200).json({
                message: 'User deleted successfully',
            });
        } else {
            res.status(404).json({
                message: 'User not found',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};


exports.updateUserRecords = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const newData = req.body;
        if (newData.password) {
            delete newData.password;
        }
        const updateFields = {};
        for (const key in newData) {
            if (newData.hasOwnProperty(key)) {
                updateFields[key] = newData[key];
            }
        }
        const updateUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
        if (!updateUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        res.status(200).json({
            message: 'User data updated successfully',
            userData: updateUser,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};


exports.updateUserByHRAdmin = async (req, res) => {
    try {
        const { role } = req.user
        if (role !== "HR" && role !== "DIRECTOR" && role !== "MANAGER") {
            throw new Error("Only HR, DIRECTOR, or MANAGER are allowed to access.");
        }
        const { userId } = req.params;
        const newData = req.body;
        if (newData.password) {
            delete newData.password;
        }
        const updateFields = {};
        for (const key in newData) {
            if (newData.hasOwnProperty(key)) {
                updateFields[key] = newData[key];
            }
        }
        const updateUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
        if (!updateUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        res.status(200).json({
            message: 'User data updated successfully',
            userData: updateUser,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};


exports.updateUserPasswordByHRAdmin = async (req, res) => {
    try {
        const { newPassword,email } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const { role } = req.user
        if (role !== "HR" && role !== "DIRECTOR" && role !== "MANAGER") {
            throw new Error("Only HR, DIRECTOR, or MANAGER are allowed to access.");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const userUpadted = await User.findOneAndUpdate(user._id, {
            $set: {
              password: hashedPassword,
            }
          })
        res.status(200).json({
            message: 'User password updated successfully',
            userUpadted
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};


exports.getUserWithManagerDetails = async (req, res) => {
    try {
        const { _id:userId } = req.user;
        const user = await User.findById(userId).populate('managerId');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.managerId) {
            return res.status(404).json({ error: "Manager not assigned to this user" });
        }
        const managerDetails=user.managerId
        res.status(200).json({ managerDetails });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const { _id:userId } = req.user;
        const user = await User.findById(userId).populate('managerId');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}

exports.acceptAgreement = async (req, res) => {
    try {
        const { _id:userId } = req.user;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.agreedToAgreement = true;
        await user.save();
        res.status(200).json({ message: "User agreement accepted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};