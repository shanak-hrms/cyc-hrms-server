const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.findUserList= async (req, res) => {
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

exports.register=async (req, res) => {
    try {
        const {email}=req.body
        let isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error("User already registered. Please sign In");
        }
        const user = new User(req.body);
        if (!user) {
            throw new Error("User not created. Something wrong")
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

exports.Login=async (req, res) => {
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

        const token =await user.generateAuthToken()
        res.status(200).json({
            name: user.name,
            role: user.role,
            phone: user.phone,
            email: user.email,
            token: token,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.deleteUserReocrds=async (req, res) => {
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

exports.updateUserRecords=async (req, res) => {
    try {
        const userId = req.params.userId;
        const newData = req.body;

        if (newData.password) {
            const saltRounds = 10;
            newData.password = await bcrypt.hash(newData.password, saltRounds);
        }

        const updateUser = await User.findByIdAndUpdate(userId, newData, { new: true });

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

