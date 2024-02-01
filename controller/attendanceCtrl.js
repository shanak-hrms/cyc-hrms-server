const express = require('express');
const MonthlyAttendance = require('../model/attendance');

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

// exports.markAttendance = async (req, res) => {
//   try {
//     const { employeeId, date, markedWithin5Km } = req.body;
//     const month = new Date(date).toLocaleString('en-US', { month: 'long' });

//     let monthlyAttendance = await MonthlyAttendance.findOne({ employeeId, month });

//     if (!monthlyAttendance) {
//       monthlyAttendance = new MonthlyAttendance({ employeeId, month, records: [] });
//     }

//     monthlyAttendance.records.push({
//       employeeId,
//       date,
//       markedWithin5Km,
//     });

//     const result = await monthlyAttendance.save();

//     res.status(201).json({
//       message: 'Attendance recorded successfully!',
//       newAttendance: result,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: err.message || 'Internal Server Error',
//     });
//   }
// };



exports.markAttendance = async (req, res) => {
    try {
        const { employeeId, date, markedWithin5Km } = req.body;
        const month = new Date(date).toLocaleString('en-US', { month: 'long' });

        let monthlyAttendance = await MonthlyAttendance.findOne({ employeeId, month });

        if (!monthlyAttendance) {
            monthlyAttendance = new MonthlyAttendance({
                employeeId,
                month,
                date,
                markedWithin5Km,
            });
        } 
    
        const result = await monthlyAttendance.save();

        res.status(201).json({
            message: 'Attendance recorded successfully!',
            newAttendance: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.requestApproval = async (req, res) => {
  try {
    const { employeeId, startDate, endDate } = req.body;
    const approvalRequest = new ApprovalRequest({
      employeeId,
      startDate,
      endDate,
      status: 'Pending',
    });

    // Calculate the number of days between startDate and endDate
    const daysDifference = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

    // Set the approval level based on the number of days
    let approvalLevel;
    if (daysDifference <= 2) {
      approvalLevel = 'Line Manager';
    } else if (daysDifference <= 5) {
      approvalLevel = 'Human Resource Manager';
    } else {
      approvalLevel = 'Director';
    }

    approvalRequest.approvalLevel = approvalLevel;

    const result = await approvalRequest.save();

    res.status(201).json({
      message: 'Approval request submitted successfully!',
      approvalRequest: result,
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
