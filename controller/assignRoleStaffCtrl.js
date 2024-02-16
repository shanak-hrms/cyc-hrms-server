const express = require('express');
const User = require('../model/user');

exports.assignEmployeeAsLineManager = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { role } = req.user
        if (role !== "HR") {
            throw new Error("Only HR is allowed to assign Employee as a Manager.");
        }
        const employee = await User.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: "User not found" });
        }
        employee.role = "MANAGER";
        await employee.save();
        res.status(200).json({ message: "Employee role updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

exports.assignEmployeeToManager = async (req, res) => {
    try {
        const { employeeId, managerId } = req.params;
        const { role } = req.user
        if (role !== "HR") {
            throw new Error("Only HR is allowed to assign Employee.");
        }
        const employee = await User.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        const manager = await User.findOne({_id:managerId,role:"MANAGER"});
        if (!manager) {
            return res.status(404).json({ error: "Manager not found" });
        }
        if (manager.employeesAssign.includes(employeeId)) {
            return res.status(400).json({ error: "Manager already has this employee assigned. If you want to update employee follow update Employee assignment features" });
        }

        employee.managerId = managerId;
        manager.employeesAssign.push(employeeId);
        await manager.save();

        await employee.save();
        res.status(200).json({ message: "Employee assigned to manager successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

exports.assignManagerToEmployee = async (req, res) => {
    try {
        const { employeeId, managerId } = req.params;
        const { role } = req.user
        if (role !== "HR") {
            throw new Error("Only HR is allowed to assign Manager.");
        }
        const employee = await User.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        if (employee.managerId) {
            return res.status(400).json({ error: "Employee already has a manager assigned. If you want to update manager follow update Manager features" });
        }
        const manager = await User.findOne({_id:managerId,role:"MANAGER"});
        if (!manager) {
            return res.status(404).json({ error: "Manager not found" });
        }
        employee.managerId = managerId;
        manager.employeesAssign.push(employeeId);
        await manager.save();
        await employee.save();
        res.status(200).json({ message: "Manager assigned to Employee successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};


exports.getUserWithManagerDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('managerId');

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}


exports.assignAssetsToEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { role } = req.user
        if (role !== "HR") {
            throw new Error("Only HR is allowed to assign assets.");
        }
        const { assets } = req.body;
        const employee = await User.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        if (Array.isArray(assets) && assets.length > 0) {
            employee.assetsAssign = [...employee.assetsAssign, ...assets];
        }
        // employee.assetsAssign = assets;
        await employee.save();

        res.status(200).json({ message: 'Assets assigned to employee successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};
