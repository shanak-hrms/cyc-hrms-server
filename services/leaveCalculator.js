// const express = require('express');
// const MonthlyAttendance = require('../model/attendance');
// const User = require('../model/user');
// const moment = require('moment');
// const nowUtc = moment.utc();

// exports.calculateAndCreditLeave=(employee, daysWorkedThisMonth,empStatus)=> {

//     if (empStatus==="PROBATION") {
//         return {
//             privilegeLeavesCredited: 0,
//             sickLeavesCredited: 0,
//             message: 'Employee has not completed the probation period yet.'
//         };
//     }
//     let privilegeLeavesCredited = 0;
//     let sickLeavesCredited = 0;

//     if (daysWorkedThisMonth >= 22) {
//         privilegeLeavesCredited = Math.min(12, Math.floor(daysWorkedThisMonth / 22 * 1.5));
//         sickLeavesCredited = Math.min(6, Math.floor(daysWorkedThisMonth / 22 * 1.5 / 2));
//     }

//     return {
//         privilegeLeavesCredited,
//         sickLeavesCredited,
//         message: 'Leaves credited successfully.'
//     };
// }




const MonthlyAttendance = require('../model/attendance');
const User = require('../model/user');
const moment = require('moment');
const { getMonthName } = require("./common")

function calculateLeave(user, daysWorkedThisMonth) {
    console.log("user",user._id,user.empStatus, daysWorkedThisMonth)
    const empStatus = user.empStatus;
    if (empStatus === "PROBATION") {
        return {
            privilegeLeavesCredited: 0,
            sickLeavesCredited: 0,
            message: 'Employee has not completed the probation period yet.'
        };
    }

    let privilegeLeavesCredited = 0;
    let sickLeavesCredited = 3;

    if (daysWorkedThisMonth >= 22) {
        privilegeLeavesCredited = Math.min(12, Math.floor(daysWorkedThisMonth / 22 * 1.5));
        sickLeavesCredited = Math.min(6, Math.floor(daysWorkedThisMonth / 22 * 1.5 / 2));
    }

    return {
        privilegeLeavesCredited,
        sickLeavesCredited,
        message: 'Leaves credited successfully.'
    };
}


exports.calculateAndCreditLeaveEveryMonth = async () => {
    try {
        const currentDate = moment();
        const currentMonth = getMonthName(currentDate.month());
        const currentYear = currentDate.year();

        const users = await User.find();
        for (const user of users) {
            const totalAttendance = await MonthlyAttendance.countDocuments({
                employeeId: user._id,
                month: currentMonth,
                year: currentYear,
                clockIn: { $ne: null },
                clockOut: { $ne: null }
            });

            const daysWorkedThisMonth = totalAttendance

            const { privilegeLeavesCredited, sickLeavesCredited, message } = calculateLeave(user, daysWorkedThisMonth);

            console.log("success",privilegeLeavesCredited,sickLeavesCredited,message)
            user.privilegeLeaveBalance += privilegeLeavesCredited;
            user.medicalLeaveBalance += sickLeavesCredited;
            await user.save();
        }

    } catch (error) {
        console.error(error);
    }
};

exports.calculateAndCreditLeave = async (req, res) => {
    try {
        const currentDate = moment();
        const currentMonth = getMonthName(currentDate.month());
        const currentYear = currentDate.year();

        const users = await User.find();
        for (const user of users) {
            const totalAttendance = await MonthlyAttendance.countDocuments({
                employeeId: user._id,
                month: currentMonth,
                year: currentYear,
                clockIn: { $ne: null },
                clockOut: { $ne: null }
            });

            const daysWorkedThisMonth = totalAttendance

            const { privilegeLeavesCredited, sickLeavesCredited, message } = calculateLeave(user, daysWorkedThisMonth);

            console.log("success",privilegeLeavesCredited,sickLeavesCredited,message)
            user.privilegeLeaveBalance += privilegeLeavesCredited;
            user.medicalLeaveBalance += sickLeavesCredited;
            await user.save();
        }

        res.status(200).json({ message: "Leave calculation and crediting completed successfully." });
    } catch (error) {
        res.status(500).json({
            error: error.message || 'Internal Server Error',
        });
    }
};






            
// exports.calculateAndCreditLeave = async (req, res) => {
//     try {
//         const currentDate = moment();
//         const currentMonth = getMonthName(currentDate.month());
//         const currentYear = currentDate.year();

//         const users = await User.find();
//         for (const user of users) {
//             const totalAttendance = await MonthlyAttendance.aggregate([
//                 {
//                     $match: {
//                         employeeId: user._id,
//                         month: currentMonth,
//                         year: currentYear,
//                         clockIn: { $ne: null },
//                         clockOut: { $ne: null }
//                     }
//                 },
//                 {
//                     $group: {
//                         _id: null,
//                         totalDaysWorked: { $sum: 1 }
//                     }
//                 }
//             ]).exec();

//             console.log("total attendance", totalAttendance);
//             const daysWorkedThisMonth = totalAttendance.length > 0 ? totalAttendance[0].totalDaysWorked : 0;

//             const { privilegeLeavesCredited, sickLeavesCredited, message } = calculateLeave(user, daysWorkedThisMonth);

//             user.privilegeLeaves += privilegeLeavesCredited;
//             user.sickLeaves += sickLeavesCredited;
//             await user.save();
//         }

//         res.status(200).json({ message: "Leave calculation and crediting completed successfully." });
//     } catch (error) {
//         res.status(500).json({
//             error: error.message || 'Internal Server Error',
//         });
//     }
// };