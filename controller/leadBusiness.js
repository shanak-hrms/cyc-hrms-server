const express = require('express');
const mongoose = require('mongoose');
const Lead = require('../model/lead');

exports.getLeadBusinessList=async (req, res) => {
    try {
        const result = await Lead.find().populate("needApprovalFor.requestby",{name:1,email:1});
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
       businessVal, businessCost, profitAmount, business,taggingHistory
    } = req.body;
    const createLead = new Lead({
      leadName, leadType, leadStatus, openDate, closeDate, leadDesc,
      businessVal, businessCost, profitAmount, business,taggingHistory
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

exports.tagIn = async (req, res) => {
  const { leadId } = req.params;
  const { tagInLocation } = req.body;
  const { _id: employeeId } = req.user;

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.taggingHistory.push({
      employeeId,
      tagIn: new Date(),
      tagInLocation: tagInLocation
    });

    await lead.save();
    res.status(200).json({ message: "Employee tagged in successfully" });
  } catch (error) {
    console.error("Error tagging in employee:", error.message);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

exports.tagOut = async (req, res) => {
  const { leadId } = req.params;
  const { tagOutLocation } = req.body;
  const { _id: employeeId } = req.user;

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      throw new Error("Lead not found");
    }

    // Find the last tagging history entry for the employee
    const lastTag = lead.taggingHistory.slice().reverse().find(tag => tag.employeeId.equals(employeeId));
    if (!lastTag) {
      return res.status(400).json({ message: "Employee cannot be tagged out. Ensure employee is tagged in." });
    }

    const tagInTime = new Date(lastTag.tagIn);
    const currentTime = new Date();
    const minutesElapsed = Math.floor((currentTime - tagInTime) / (1000 * 60));

    if (minutesElapsed < 1) {
      return res.status(400).json({ message: "Employee cannot be tagged out. Minimum tag-in duration of 15 minutes required." });
    }

    lastTag.tagOut = new Date();
    lastTag.tagOutLocation = tagOutLocation;

    await lead.save();

    res.status(200).json({ message: "Employee tagged out successfully" });
  } catch (error) {
    console.error("Error tagging out employee:", error.message);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
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



exports.requestLeadUpdate = async (req, res) => {
  try {
    const { leadId } = req.params;
    const {  requestFor } = req.body;
    const {_id:requestby }= req.user

    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    let currentStatus=lead.leadStatus;

    // console.log(lead.needApprovalFor.currentStatus !== currentStatus)
    if (!(lead.needApprovalFor.currentStatus !== currentStatus) || !lead.needApprovalFor.requestFor===requestFor || lead.leadStatus===requestFor) {
      return res.status(403).json({ error: 'Requested update is not allowed' });
    }

    lead.needApprovalFor = { currentStatus, requestFor, requestby };
    lead.needApprovalFrom="MANAGER"
    lead.leadRequestStatus="Pending"
    await lead.save();

    res.status(200).json({ message: 'Lead update request submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.approveLeadUpdateRequest = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { role } = req.user
    if (role !== "MANAGER" ) {
        throw new Error("Only Manager is allowed to approve the request.");
    }
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    if (!lead.needApprovalFor.requestFor) {
      return res.status(400).json({ error: 'No pending update request found' });
    }
    console.log("hello")

    lead.leadStatus = lead.needApprovalFor.requestFor;
    lead.needApprovalFor=null
    lead.needApprovalFor.requestFor = null; 
    lead.needApprovalFor.currentStatus = null; 
    lead.needApprovalFor.requestby = null; 
    lead.leadRequestStatus='No Request',
    lead.needApprovalFrom=null
    await lead.save();

    res.status(200).json({ message: 'Lead update request approved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
