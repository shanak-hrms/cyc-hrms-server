const express = require('express');
const router = express.Router();
const Employee = require('../model/employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.employeeList=async (req, res) => {
    try {
        const result = await Employee.find();
        res.status(200).json({
            employeeData: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.createNewEmployee=async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const employee = new Employee({
            name: req.body.name,
            role: req.body.role,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            password: hashedPassword,
            address: req.body.address,
            emp_id: req.body.emp_id,
            branch: req.body.branch,
            department: req.body.department,
            designation: req.body.designation,
            dateOfJoin: req.body.dateOfJoin,
            certificate: req.body.certificate,
            resume: req.body.resume,
            photo: req.body.photo,
            accHolderName: req.body.accHolderName,
            bankName: req.body.bankName,
            bankBranch: req.body.bankBranch,
            accNumber: req.body.accNumber,
            bankIndentifierCode: req.body.bankIndentifierCode,
            taxPayerId: req.body.taxPayerId,
        });

        const result = await employee.save();
        res.status(200).json({
            new_user: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.employeeLogin=async (req, res) => {
    try {
        const user = await Employee.find({ email: req.body.email });
        if (user.length < 1) {
            return res.status(401).json({
                msg: "user not exists",
            });
        }

        const result = await bcrypt.compare(req.body.password, user[0].password);

        if (!result) {
            return res.status(401).json({
                msg: "password matching failed",
            });
        }

        const token = jwt.sign(
            {
                emp_id: user[0].emp_id,
                role: user[0].role,
                name: user[0].name,
                phone: user[0].phone,
                email: user[0].email,
            },
            'this is dummy text',
            {
                expiresIn: "24h",
            }
        );

        res.status(200).json({
            emp_id: user[0].emp_id,
            role: user[0].role,
            name: user[0].name,
            phone: user[0].phone,
            email: user[0].email,
            token: token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.updateEmployeeRecords=async (req, res) => {
    try {
        const userId = req.params.userId;
        const newData = req.body;

        const updateEmployee = await Employee.findByIdAndUpdate(userId, newData, { new: true });

        if (!updateEmployee) {
            return res.status(404).json({
                message: 'Employee not found',
            });
        }

        res.status(200).json({
            message: 'Employee Updated successfully',
            employeeData: updateEmployee,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.deleteEployeeRecord=async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await Employee.deleteOne({ _id: userId });

        if (result.deletedCount === 1) {
            res.status(200).json({
                message: 'Employee deleted successfully',
            });
        } else {
            res.status(404).json({
                message: 'Employee not found',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

