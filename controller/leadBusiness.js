const express = require('express');
const mongoose = require('mongoose');
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

exports.createLead = async (req, res) => {
  try {
    const {
      leadName, leadType, leadStatus, openDate, closeDate, leadDesc,
       businessVal, businessCost, profitAmount, business
    } = req.body;
    const createLead = new Lead({
      leadName, leadType, leadStatus, openDate, closeDate, leadDesc,
      businessVal, businessCost, profitAmount, business
    });

    const result = await createLead.save();

    res.status(201).json({
      message: 'New lead created successfully!',
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
        const leadId = req.params.leadId;
        const newData = req.body;
        const updateLead = await Lead.findByIdAndUpdate(leadId, newData, { new: true });
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


exports.updateLeadStatus = async (req, res) => {
  const { leadId } = req.params;
  const { leadStatus } = req.body;

  try {
    if (!["Closed", "Open", "Cold", "Hot"].includes(leadStatus)) {
      return res.status(400).json({ error: 'Invalid lead status.' });
    }

    const updateObject = { leadStatus };
    if (leadStatus === "Closed") {
      updateObject.closeDate = new Date();
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      { $set: updateObject },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ error: 'Lead not found.' });
    }

    res.json(updatedLead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getParticularLeadDetails = async (req, res) => {
  try {
    const { leadId } = req.params;
    console.log("leadId",leadId)

    if (!mongoose.Types.ObjectId.isValid(leadId)) {
      return res.status(400).json({ error: 'Invalid lead ID.' });
    }
    const result = await Lead.findById(leadId);
    if (!result) {
      return res.status(404).json({ error: 'Lead not found.' });
    }
    res.status(200).json({
      leadData: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message || 'Internal Server Error',
    });
  }
};


exports.deleteLeadRecords= async (req, res) => {
    try {
        const {leadId} = req.params;

        const result = await Lead.deleteOne({ _id: leadId });

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
