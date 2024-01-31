const express = require('express');
const router = express.Router();
const EmpLeave = require('../model/empLeave');

exports.getemployeeLeave=async (req, res) => {
    try {
        const result = await EmpLeave.find();
        res.status(200).json({
            leaveData: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.appyLeaveRequest=async (req, res) => {
    try {
        const { emp_id, name, leave_type, start_date, end_date, leave_reason, status } = req.body;
        const createLeave = new EmpLeave({
            emp_id,
            name,
            leave_type,
            start_date,
            end_date,
            leave_reason,
            status,
        });

        const result = await createLeave.save();
        res.status(200).json({
            new_leave: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};
exports.updateLeaveRequest=async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const newData = req.body;

        const updateLeave = await EmpLeave.findByIdAndUpdate(userId, newData, { new: true });

        if (!updateLeave) {
            return res.status(404).json({
                message: 'leave not found',
            });
        }

        res.status(200).json({
            message: 'Leave updated successfully',
            leaveData: updateLeave,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.deleteLeaveRequest=async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const result = await EmpLeave.deleteOne({ _id: userId });

        if (result.deletedCount === 1) {
            res.status(200).json({
                message: 'leave deleted successfully',
            });
        } else {
            res.status(404).json({
                message: 'leave not found',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

