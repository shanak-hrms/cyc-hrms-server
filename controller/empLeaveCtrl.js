const express = require('express');
const router = express.Router();
const EmpLeave = require('../model/empLeave');



exports.applyForLeave = async (req, res) => {
    try {
        const { _id: employeeId } = req.user;
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

        let leaveDates = [];

        if (dates && dates.length > 0) {
            let isSaturdayFound = false;
            let isMondayFound = false;

            // Loop through provided dates
            for (const date of dates) {
                // Include date
                leaveDates.push(new Date(date));

                // Check if the date is a Saturday
                if (new Date(date).getDay() === 6) {
                    isSaturdayFound = true;
                }

                // Check if the date is a Monday
                if (new Date(date).getDay() === 1) {
                    isMondayFound = true;
                }

                // Include the corresponding Sunday only when both Saturday and Monday occur continuously
                if (isSaturdayFound && isMondayFound) {
                    const nextDay = new Date(date);
                    nextDay.setDate(nextDay.getDate() -1);
                    leaveDates.push(nextDay);

                    // Reset flags after including corresponding Sunday
                    isSaturdayFound = false;
                    isMondayFound = false;
                }
            }
        } else if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            while (start <= end) {
                leaveDates.push(new Date(start));
                start.setDate(start.getDate() + 1);
            }
        }

        if (leaveDates.length > 0) {
            const leaveRequest = new EmpLeave({
                month,
                employeeId,
                startDate,
                endDate,
                dates: leaveDates,
                leaveType,
                needApprovalFrom,

            });
            await leaveRequest.save();

            res.status(201).json({
                message: 'Leave request submitted successfully',
                leaveRequest,
            });
        } else {
            return res.status(400).json({ error: 'Invalid input. Provide valid dates or date range.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};


exports.getPendingLeave = async (req, res) => {
    try {
        const pendingLeave = await EmpLeave.find({ status: 'Pending' })
            .populate('employeeId', { name: 1, email: 1 });

        res.status(200).json({
            pendingLeave,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.getApprovedLeave = async (req, res) => {
    try {
        const approvedLeave = await EmpLeave.find({ status: 'Approved' })
            .populate('employeeId', { name: 1, email: 1 }); 

        res.status(200).json({
            approvedLeave,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.getRejectedLeave = async (req, res) => {
    try {
        const rejectedLeave = await EmpLeave.find({ status: 'Rejected' })
            .populate('employeeId', { name: 1, email: 1 });

        res.status(200).json({
            rejectedLeave,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};





exports.updateLeaveRequest = async (req, res, next) => {
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

exports.deleteLeaveRequest = async (req, res, next) => {
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

exports.getemployeeLeave = async (req, res) => {
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