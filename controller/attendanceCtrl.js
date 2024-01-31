const express = require('express');
const Attendance = require('../model/attendance');

exports.getAttandance=async (req, res) => {
    try {
        const result = await Attendance.find();
        res.status(200).json({
            attendanceData: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.createAttandance=async (req, res, next) => {
    try {
        const {name,date,status,clock_in,clock_out,late,early_leaving,overtime}=req.body
        const attendance = new Attendance({
            name,
            date,
            status,
            clock_in,
            clock_out,
            late,
            early_leaving,
            overtime
        });

        const result = await attendance.save();
        res.status(200).json({
            new_Attendance: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.updateAttandance= async (req, res) => {
    try {
        const userId = req.params.userId;
        const newData = req.body;

        const updateAttendance = await Attendance.findByIdAndUpdate(userId, newData, { new: true });

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
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.deleteAttandance=async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await Attendance.deleteOne({ _id: userId });

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
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};
