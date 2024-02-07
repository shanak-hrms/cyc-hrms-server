const express = require('express');
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

exports.getParticularLeaveByID = async (req, res) => {
    try {
        // const { role } = req.user
        // if (role !== "User") {
        //     throw new Error("User are not allowed to access.");
        // }

        const {requestId}=req.params
        const pendingLeave = await EmpLeave.findById(requestId)
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
exports.getPendingLeaveForUser = async (req, res) => {
    try {
        const { _id: employeeId } = req.user;

        const approvedLeave = await EmpLeave.find({ status: 'Pending', employeeId: employeeId })
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
exports.getApprovedLeaveForUser = async (req, res) => {
    try {
        const { _id: employeeId } = req.user;

        const approvedLeave = await EmpLeave.find({ status: 'Approved', employeeId: employeeId })
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

exports.getRejectedLeaveForUSer = async (req, res) => {
    try {
        const { _id: employeeId } = req.user;
        const rejectedLeave = await EmpLeave.find({ status: 'Rejected',employeeId:employeeId })
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


exports.approveLeaveRequest = async (req, res) => {
    try {
        const { leaveRequestId } = req.params;
        const { role,_id: approverId} = req.user;

        const leaveRequest = await EmpLeave.findById(leaveRequestId);

        if (!leaveRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }

        if (!leaveRequest.needApprovalFrom.includes(role)) {
            return res.status(403).json({ error: 'You are not authorized to approve this leave request' });
        }

        leaveRequest.status = 'Approved';
        leaveRequest.approver = {approverId,role};
        await leaveRequest.save();

        res.status(200).json({
            message: 'Leave request approved successfully',
            leaveRequest,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.rejectLeaveRequest = async (req, res) => {
    try {
        const { leaveRequestId } = req.params;
        const { role,_id: approverId} = req.user;

        const leaveRequest = await EmpLeave.findById(leaveRequestId);

        if (!leaveRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }

        if (!leaveRequest.needApprovalFrom.includes(role)) {
            return res.status(403).json({ error: 'You are not authorized to reject this leave request' });
        }

        leaveRequest.status = 'Rejected';
        leaveRequest.approver = {approverId,role};
        await leaveRequest.save();

        res.status(200).json({
            message: 'Leave request approved successfully',
            leaveRequest,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

