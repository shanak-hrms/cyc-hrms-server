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
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            emp_id: req.body.emp_id,
            name: req.body.name,
            role: req.body.role,
            dateOfJoin: req.body.dateOfJoin,
            branch: req.body.branch,
            department: req.body.department,
            designation: req.body.designation,
            email: req.body.email,
            password: hashedPassword,
        });

        const result = await user.save();
        res.status(200).json({
            new_user: result,
        });
    } catch (err) {
        console.error(err);
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
                msg: 'User not exists',
            });
        }

        const result = await bcrypt.compare(req.body.password, user.password);

        if (!result) {
            return res.status(401).json({
                msg: 'Password matching failed',
            });
        }

        const token = jwt.sign({
            username: user.username,
            role: user.role,
            phone: user.phone,
            email: user.email,
        },
            'this is dummy text',
            {
                expiresIn: '24h',
            });

        res.status(200).json({
            username: user.username,
            role: user.role,
            phone: user.phone,
            email: user.email,
            token: token,
        });
    } catch (err) {
        console.error(err);
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

