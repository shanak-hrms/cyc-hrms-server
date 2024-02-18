const express = require('express');
const MonthlyAttendance = require('../model/attendance');
const User = require('../model/user');
const moment = require('moment');
const nowUtc = moment.utc();

exports.markAttendance = async (req, res) => {
    try {
        const { _id: employeeId } = req.user
        const { date, markedWithin5Km, time } = req.body;
        const currentDate = new Date();
        const attendanceDate = new Date(date);
        const year = attendanceDate.getFullYear()
        const month = attendanceDate.toLocaleString('en-US', { month: 'long' });

        // Check if attendance is for the previous day
        const isPreviousDay = attendanceDate.toDateString() !== currentDate.toDateString();

        if (isPreviousDay) {
            const approvalRequired = true;

            if (approvalRequired) {
                // Check if approval exists for the previous day
                const approvalExists = await MonthlyAttendance.findOne({
                    employeeId,
                    month,
                    date: new Date(date),
                    'regularizationRequest.status': 'Approved',
                });

                if (!approvalExists) {
                    return res.status(400).json({
                        message: 'Attendance for the previous day requires approval from Manager, Director, or HR.',
                    });
                }

                if (approvalExists.clockIn) {
                    return res.status(400).json({
                        message: 'Attendance for the given day already recorded.',
                    });
                }

                // const clockINDate=approvalExists.date
                // const formatClockIn=clockINDate.split("T")[0]
                // const combineClockIn=formatClockIn.concat(`${time}:00Z`)
                // approvalExists.clockIn = combineClockIn;

                // const result = await approvalExists.save();



                throw new Error("Please CheckIN Attendance for the given day throught ChecIN Previous day Module.")

            }
        }
        // Check if attendance for the given day already exists
        const existingAttendance = await MonthlyAttendance.findOne({ employeeId, month, date, });

        if (existingAttendance?.clockIn) {
            return res.status(400).json({
                message: 'Attendance for the given day already recorded.',
            });
        }

        const newAttendance = new MonthlyAttendance({
            employeeId,
            month,
            year,
            date,
            markedWithin5Km,
            clockIn: new Date()
        });
        const result = await newAttendance.save();
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

exports.checkINApprovedAttendance = async (req, res) => {
    try {
        const { _id: employeeId } = req.user;
        const { requestId } = req.params;
        const { time } = req.body;
        const approvalExists = await MonthlyAttendance.findOne({ _id: requestId, employeeId });
        if (!approvalExists) {
            return res.status(404).json({
                message: 'Approval Attendance for the given id not found.',
            });
        }
        const isApproved = approvalExists?.regularizationRequest?.status === 'Approved';
        if (!isApproved) {
            return res.status(400).json({
                message: 'Attendance for the previous day requires approval from Manager, Director, or HR.',
            });
        }

        if (approvalExists.clockIn) {
            return res.status(400).json({
                message: 'clockIn has already been marked.',
            });
        }
        const clockINDate = approvalExists.date.toISOString();
        const formatClockIn = clockINDate.split("T")[0];
        const combineClockIn = formatClockIn.concat(`T${time}:00.000Z`);
        approvalExists.clockIn = new Date(combineClockIn);
        const result = await approvalExists.save();

        res.status(200).json({
            message: 'clockIn recorded successfully!',
            updatedAttendance: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.requestApproval = async (req, res) => {
    try {
        const { _id: employeeId } = req.user
        const { date, } = req.body;
        const currentDate = new Date();
        const requestedDate = new Date(date);
        const year = requestedDate.getFullYear()
        const days = Math.ceil((currentDate - requestedDate) / (1000 * 60 * 60 * 24));
        console.log("days", days)
        const month = currentDate.toLocaleString('en-US', { month: 'long' });

        // Check if approval request already exists for the given day
        const existingRequest = await MonthlyAttendance.findOne({
            employeeId,
            month,
            date,
            'regularizationRequest.status': { $in: ['Pending', 'Approved'] },
        });

        if (existingRequest) {
            return res.status(400).json({
                message: 'Approval request for the given day already exists or has been approved.',
            });
        }

        const newRequest = new MonthlyAttendance({
            employeeId,
            month,
            year,
            date,
            'regularizationRequest.days': days,
            'regularizationRequest.status': 'Pending',
        });

        const result = await newRequest.save();
        res.status(201).json({
            message: 'Approval request submitted successfully!',
            newRequest: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.getAllPendingRegularizationRequests = async (req, res) => {
    try {
        const { role } = req.user
        if (role !== "HR" && role !== "DIRECTOR" && role !== "MANAGER") {
            throw new Error("Only HR, DIRECTOR, or MANAGER are allowed to access.");
        }
        const pendingRegularizationRequests = await MonthlyAttendance.find({
            'regularizationRequest.status': 'Pending',
        })
            .populate('employeeId', { name: 1, email: 1 });

        res.status(200).json({
            pendingRegularizationRequests,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.getPendingRegularizationRequestById = async (req, res) => {
    try {
        const { pendingId } = req.params;

        const pendingRegularizationRequest = await MonthlyAttendance.findOne({
            _id: pendingId,
            'regularizationRequest.status': 'Pending',
        }).populate('employeeId', { name: 1, email: 1 });

        if (!pendingRegularizationRequest) {
            return res.status(404).json({
                error: 'Pending Regularization Request not found',
            });
        }

        res.status(200).json({
            pendingRegularizationRequest,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};


exports.approveRequest = async (req, res) => {
    try {
        const { _id: approverId, role } = req.user
        const { requestId } = req.params;
        const request = await MonthlyAttendance.findById(requestId);

        if (!request) {
            return res.status(404).json({
                message: 'Approval request not found.',
            });
        }

        if (request.regularizationRequest.status === 'Approved') {
            return res.status(400).json({
                message: 'Approval request has already been approved.',
            });
        }

        // Set the approver and update the status based on the number of days
        const days = request.regularizationRequest.days;
        let status = 'Approved';

        if (days <= 2) {
            if (role !== 'MANAGER') {
                return res.status(403).json({
                    message: 'Permission denied. Only Managers can approve requests for 2 days.',
                });
            }
            request.regularizationRequest.approver = approverId;
        } else if (days >= 3 && days <= 5) {
            if (role !== 'HR' && role !== 'Director') {
                return res.status(403).json({
                    message: 'Permission denied. Only HR or Directors can approve requests for 3-5 days.',
                });
            }
            request.regularizationRequest.approver = approverId;
        } else if (days > 5) {
            if (role !== 'DIRECTOR') {
                return res.status(403).json({
                    message: 'Permission denied. Only Directors can approve requests for more than 5 days.',
                });
            }
            request.regularizationRequest.approver = approverId;
        } else {
            return res.status(400).json({
                message: 'Invalid number of days for approval.',
            });
        }

        request.regularizationRequest.status = status;
        await request.save();

        res.status(200).json({
            message: 'Approval request has been successfully approved!',
            approvedRequest: request,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.checkOut = async (req, res) => {
    try {
        const { _id: employeeId } = req.user
        const { requestId } = req.params
        const { date } = req.body;
        const month = new Date(date).toLocaleString('en-US', { month: 'long' });
        const existingAttendance = await MonthlyAttendance.findOne({ employeeId, _id: requestId, month, date: new Date(date) });
        // console.log("month", existingAttendance)

        if (!existingAttendance) {
            return res.status(404).json({
                message: 'Attendance for the given day not found.',
            });
        }

        if (existingAttendance.clockOut) {
            return res.status(400).json({
                message: 'ClockOut has already been marked for the given day.',
            });
        }

        if (!existingAttendance.clockIn) {
            return res.status(400).json({
                message: 'ClockOut Not allowed.You need to checkIn first for the given day.',
            });
        }
        existingAttendance.clockOut = new Date();

        const result = await existingAttendance.save();

        res.status(200).json({
            message: 'ClockOut recorded successfully!',
            updatedAttendance: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.getAttandance = async (req, res) => {
    try {
        const result = await MonthlyAttendance.find().populate("employeeId", { name: 1, email: 1 });
        res.status(200).json({
            attendanceData: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.getAttandanceForMonth = async (req, res) => {
    try {
        const { _id: employeeId } = req.user
        const { month } = req.query
        const result = await MonthlyAttendance.find({ employeeId, month }).populate("employeeId", { name: 1, email: 1 });
        res.status(200).json({
            attendanceData: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};


exports.autoClockout = async (req, res) => {
    try {
        const now = moment();
        const unClockOutTodayAttendanceList = await MonthlyAttendance.find({
            clockOut: null,
        });
        console.log("unClockOutTodayAttendanceList", unClockOutTodayAttendanceList,now.startOf('day').toDate(),nowUtc.startOf('day').toDate())
        for (const attendance of unClockOutTodayAttendanceList) {
            if (!attendance.clockOut) {
                attendance.clockOut = nowUtc.startOf('day').toDate();
                attendance.attendanceStatus = "Auto-Midnight"
                await attendance.save();  
            }
        }

        res.status(200).json({ message: 'Automatic clockout process completed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.autoClockoutMidNight = async () => {
    try {
        const now = moment();
        const unClockOutTodayAttendanceList = await MonthlyAttendance.find({
            clockOut: null,
        });
        console.log("unClockOutTodayAttendanceList", unClockOutTodayAttendanceList,now.startOf('day').toDate(),nowUtc.startOf('day').toDate())
        for (const attendance of unClockOutTodayAttendanceList) {
            if (!attendance.clockOut) {
                attendance.clockOut = nowUtc.startOf('day').toDate();
                attendance.attendanceStatus = "Auto-Midnight"
                await attendance.save();  
            }
        }

        console.log('Automatic clockout process completed');
    } catch (err) {
        console.error(err);
    }
};




// exports.requestApproval = async (req, res) => {
//     try {
//         const { employeeId, startDate, endDate } = req.body;
//         const approvalRequest = new ApprovalRequest({
//             employeeId,
//             startDate,
//             endDate,
//             status: 'Pending',
//         });

//         // Calculate the number of days between startDate and endDate
//         const daysDifference = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

//         // Set the approval level based on the number of days
//         let approvalLevel;
//         if (daysDifference <= 2) {
//             approvalLevel = 'Line Manager';
//         } else if (daysDifference <= 5) {
//             approvalLevel = 'Human Resource Manager';
//         } else {
//             approvalLevel = 'Director';
//         }

//         approvalRequest.approvalLevel = approvalLevel;

//         const result = await approvalRequest.save();

//         res.status(201).json({
//             message: 'Approval request submitted successfully!',
//             approvalRequest: result,
//         });
//     } catch (err) {
//         res.status(500).json({
//             error: err.message || 'Internal Server Error',
//         });
//     }
// };




exports.updateAttandance = async (req, res) => {
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

exports.deleteAttandance = async (req, res) => {
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