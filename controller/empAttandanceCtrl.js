const express = require('express');
const router = express.Router();
const EmpAttendance = require('../model/empAttendance');

exports.getEmpAttandance=async (req, res) => {
    try {
        const result = await EmpAttendance.find();
        res.status(200).json({
            EmpAttendanceData: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.clockIN= async (req, res) => {
    try {
        const { emp_id, name, email, date, status, clock_in, clock_out } = req.body;

        // Create a new attendance record
        const markedAttendance = new EmpAttendance({
            emp_id,
            name,
            email,
            date,
            status,
            clock_in,
            clock_out,
        });

        const result = await markedAttendance.save();
        res.status(200).json({
            mark_attendance: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.updateEmployeeAttandance=async (req, res) => {
    try {
        const userId = req.params.userId;
        const newData = req.body;

        const updateAttendance = await EmpAttendance.findByIdAndUpdate(userId, newData, { new: true });

        if (!updateAttendance) {
            return res.status(404).json({
                message: 'attendance not found',
            });
        }

        res.status(200).json({
            message: 'Updated attendance successfully',
            attendanceData: updateAttendance,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

