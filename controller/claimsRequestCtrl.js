const express = require('express');
const ClaimsRequest = require('../model/claimsRequest');

exports.getClaimsRequest=async (req, res) => {
    try {
        const result = await ClaimsRequest.find();
        res.status(200).json({
            claimsRequestData: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.createClaimsRequest=async (req, res) => {
    try {
        const createClaimRequest = new ClaimsRequest({
            emp_id: req.body.emp_id,
            name: req.body.name,
            message: req.body.message,
            attachment: req.body.attachment,
            claimsType: req.body.claimsType,
        });

        const result = await createClaimRequest.save();
        res.status(200).json({
            message: 'Claim request created successfully!',
            new_claimRequest: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.updateClaimRequest=async (req, res) => {
    try {
        const userId = req.params.userId;
        const newData = req.body;

        const updateClaimRequest = await ClaimsRequest.findByIdAndUpdate(userId, newData, { new: true });

        if (!updateClaimRequest) {
            return res.status(404).json({
                message: 'Claim request not found',
            });
        }

        res.status(200).json({
            message: 'Claim request updated successfully',
            claimsRequestData: updateClaimRequest,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.deleteClaimsRequest= async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await ClaimsRequest.deleteOne({ _id: userId });

        if (result.deletedCount === 1) {
            res.status(200).json({
                message: 'Claim request deleted successfully',
            });
        } else {
            res.status(404).json({
                message: 'Claim request not found',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};
