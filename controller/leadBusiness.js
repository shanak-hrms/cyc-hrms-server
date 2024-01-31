const express = require('express');
const router = express.Router();
const Lead = require('../model/lead');

exports.getLeadBusinessList=async (req, res) => {
    try {
        const result = await Lead.find();
        res.status(200).json({
            leadData: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.createLead=async (req, res) => {
    try {
        const createLead = new Lead({
            leadName: req.body.leadName,
            leadType: req.body.leadType,
            leadStatus: req.body.leadStatus,
            openDate: req.body.openDate,
            closeDate: req.body.closeDate,
            leadDesc: req.body.leadDesc,
            businessType: req.body.businessType,
            businessFrom: req.body.businessFrom,
            businessVal: req.body.businessVal,
            businessCost: req.body.businessCost,
            profitAmount: req.body.profitAmount,
        });

        const result = await createLead.save();
        res.status(200).json({
            message: 'Created new lead successfully!',
            new_lead: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.updateLeadRecords= async (req, res) => {
    try {
        const userId = req.params.userId;
        const newData = req.body;

        const updateLead = await Lead.findByIdAndUpdate(userId, newData, { new: true });

        if (!updateLead) {
            return res.status(404).json({
                message: 'Lead not found',
            });
        }

        res.status(200).json({
            message: 'Lead updated successfully',
            leadData: updateLead,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.deleteLeadRecords= async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await Lead.deleteOne({ _id: userId });

        if (result.deletedCount === 1) {
            res.status(200).json({
                message: 'Lead deleted successfully!',
            });
        } else {
            res.status(404).json({
                message: 'Lead not found!',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};
