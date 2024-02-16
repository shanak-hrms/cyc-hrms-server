const Employee = require("../model/user")
const Salary = require("../model/salarySchema")

const Payroll = require('../model/payrollSchema');
const SalaryStructure = require('../model/salarySchema');

const MonthlyAttendance = require('../model/attendance');

const getPresentAttendanceList = async (month,year) => {
    try {
        const attendanceList = await MonthlyAttendance.find({ month,year, clockIn: { $ne: null }, clockOut: { $ne: null } });

        const attendanceListLength = attendanceList.length;

        return { attendanceList, attendanceListLength };
    } catch (error) {
        console.error('Error in getting present attendance list:', error);
        throw error;
    }
}

const getIncompleteAttendanceList = async (month,year) => {
    try {
        const incompletAttendanceList = await MonthlyAttendance.find({
            month,
            year,
            clockIn: { $ne: null },
            clockOut: null
        });

        const incompleteAttendanceListLength = incompletAttendanceList.length;

        return { incompletAttendanceList, incompleteAttendanceListLength };
    } catch (error) {
        console.error('Error in getting incomplete attendance list:', error);
        throw error;
    }
}

function isLeapYear(year) {
    // Leap year is divisible by 4, not divisible by 100 unless also divisible by 400
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getNumberOfDaysInMonth(monthName, year) {
    const monthDaysMap = {
        "January": 31,
        "February": isLeapYear(year) ? 29 : 28,
        "March": 31,
        "April": 30,
        "May": 31,
        "June": 30,
        "July": 31,
        "August": 31,
        "September": 30,
        "October": 31,
        "November": 30,
        "December": 31
    };

    // Retrieve the number of days for the given month from the map
    const numberOfDays = monthDaysMap[monthName];

    if (numberOfDays) {
        return numberOfDays;
    } else {
        throw new Error('Invalid month name');
    }
}

const calculateSalary = (payroll) => {
    const { basicSalary, hraPercentage, daPercentage, travelAllowance, ptaxDeduction, pfPercentage, esiPercentage ,specialAllowance} = payroll;

    const hra = (hraPercentage / 100) * basicSalary;
    const da = (daPercentage / 100) * basicSalary;

    const totalGrossPay = basicSalary + hra + da + travelAllowance+specialAllowance?.value;

    // Calculate PF deduction for both employee and employer
    const pfDeductionEmployee = (pfPercentage / 100) * basicSalary;
    const pfDeductionEmployer = pfDeductionEmployee;

    // Calculate ESI deduction if applicable
    let esiDeduction = 0;
    if (totalGrossPay <= 21000) {
        esiDeduction = (esiPercentage / 100) * totalGrossPay;
    }

    // Calculate Total Deductions
    const totalDeductions = ptaxDeduction + pfDeductionEmployee + esiDeduction;

    const netPay = totalGrossPay - totalDeductions;

    return {
        basic: basicSalary,
        hra,
        da,
        travelAllowanceDeduction: travelAllowance,
        totalGrossPay,
        ptax: ptaxDeduction,
        pfDeductionEmployee,
        pfDeductionEmployer,
        esiDeduction,
        totalDeductions,
        netPay
    };
};

const createPayrollAndCalculateSalary = async (req, res) => {

    try {
        const { employeeId, month, year } = req.body;
        const { role } = req.user
        if (role !== "HR" && role !== "DIRECTOR" && role !== "LINE MANAGER") {
            throw new Error("Only HR, DIRECTOR, or LINE MANAGER are allowed to access.");
        }

        const existingPayroll = await Payroll.findOne({ employeeId, month });
        if (existingPayroll) {
            return res.status(200).json({ existingPayroll });
        }
        const isSalaryStructureExist = await SalaryStructure.findOne({ employeeId });
        if(!isSalaryStructureExist){
            throw new Error("Salary structure is not created for this user.");
        }
        const { basicSalary, hraPercentage, daPercentage, travelAllowance, ptaxDeduction, pfPercentage, esiPercentage,specialAllowance } = isSalaryStructureExist;
        // const result = await MonthlyAttendance.find({ employeeId, month }).populate("employeeId", { name: 1, email: 1 });

        const { attendanceList, attendanceListLength } = await getPresentAttendanceList(month,year)
        const { incompletAttendanceList, incompleteAttendanceListLength } = await getIncompleteAttendanceList(month,year)

        // return res.status(201).json({ complte: [attendanceList, attendanceListLength], incomplete: [incompletAttendanceList, incompleteAttendanceListLength] });

        // let attendanceListLength=25
        // let incompleteAttendanceListLength=6
        const numberOfDaysINMonth = getNumberOfDaysInMonth(month, year)
        const calculatebasicSalaryPerDay = (basicSalary / numberOfDaysINMonth)
        const calculatebasicSalaryOfMonth = (calculatebasicSalaryPerDay * attendanceListLength) + (calculatebasicSalaryPerDay * (incompleteAttendanceListLength / 2))

        const salaryObj = {
            basicSalary: calculatebasicSalaryOfMonth,
            hraPercentage,
            daPercentage,
            travelAllowance,
            ptaxDeduction,
            pfPercentage,
            esiPercentage,
            specialAllowance
        }

        const result = calculateSalary(salaryObj)
        const {
            basic,
            hra,
            da,
            travelAllowanceDeduction,
            ptax,
            totalGrossPay,
            pfDeductionEmployee,
            pfDeductionEmployer,
            esiDeduction,
            totalDeductions,
            netPay
        } = result
        const payroll = new Payroll({
            month,
            year,
            employeeId,
            basic,
            hra,
            da,
            travelAllowanceDeduction,
            ptax,
            totalGrossPay,
            pfDeductionEmployee,
            pfDeductionEmployer,
            esiDeduction,
            totalDeductions,
            netPay,specialAllowance
        });
        await payroll.save();

        return res.status(200).json({ payroll });
    } catch (error) {
        console.error('Error in creating payroll:', error);
        return res.status(500).json({ error});
    }
};

const getPayrollById = async (req, res) => {
    try {
        const { id } = req.params;
        const payroll = await Payroll.findById(id);
        if (!payroll) {
            return res.status(404).json({ message: 'Payroll not found' });
        }
        return res.status(200).json({ payroll });
    } catch (error) {
        console.error('Error in getting payroll by ID:', error);
        return res.status(500).json({ error: 'An error occurred while fetching payroll' });
    }
};

const downloadPayrollMonthly = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { month } = req.query
        const payroll = await Payroll.findOne({ employeeId, month }).populate("employeeId", {empCode:1, name: 1, email: 1,department:1,designation:1,status:1,esic:1,bankAccount:1,bankName:1,uanNumber:1 });
        if (!payroll) {
            return res.status(404).json({ message: 'Payroll not found' });
        }

        return res.status(200).json({ payroll });
    } catch (error) {
        console.error('Error in getting payroll by ID:', error);
        return res.status(500).json({ error: 'An error occurred while fetching payroll' });
    }
};


module.exports = {
    createPayrollAndCalculateSalary,
    getPayrollById: getPayrollById,
    downloadPayrollMonthly:downloadPayrollMonthly
};
