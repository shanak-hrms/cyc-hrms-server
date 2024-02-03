const express = require('express');
const router = express.Router();
const EmpLeave = require('../model/empLeave');


exports.applyForLeave = async (req, res) => {
    try {
        const {_id:employeeId}=req.user
        const { month, startDate, endDate, dates, leaveType } = req.body;

        if (!['Sick', 'Privilege', 'LWP'].includes(leaveType)) {
            return res.status(400).json({ error: 'Invalid leaveType. Valid options are Sick, Privilege, or LWP.' });
        }

        let needApprovalFrom = [];
        if (leaveType === 'Sick') {
            needApprovalFrom = ['HR'];
        } else if (leaveType === 'LWP') {
            needApprovalFrom = ['Line Manager', 'HR', 'Director'];
        }

        if ((startDate && endDate && !dates) || (!startDate && !endDate && dates && dates.length > 0)) {
            const leaveRequest = new EmpLeave({
                month,
                employeeId,
                startDate,
                endDate,
                dates,
                leaveType,
                needApprovalFrom
            });
            await leaveRequest.save();
            res.status(201).json({
                message: 'Leave request submitted successfully',
                leaveRequest,
            });
        } else {
            return res.status(400).json({ error: 'Invalid input. Provide either startDate and endDate or dates array.' });
        }
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