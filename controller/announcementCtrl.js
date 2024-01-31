const express = require('express');
const Announcement = require('../model/announcement');


exports.getAnnouncement=async(req, res) => {
    Announcement.find()
        .then(result => {
            res.status(200).json({
                anouncementData: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.create = async (req, res) => {
    try {
        const { title, start_date, start_time, description } = req.body;
        const createAnnouncement = new Announcement({
            title,
            start_date,
            start_time,
            description,
        });

        const result = await createAnnouncement.save();
        res.status(200).json({
            newAnnouncement: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || "Internal Server Error",
        });
    }
};


exports.updateAnnouncement=async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const newData = req.body;

        const updateData = await Announcement.findByIdAndUpdate(userId, newData, { new: true });

        if (!updateData) {
            return res.status(404).json({
                message: "data not found",
            });
        }

        res.status(200).json({
            message: "data updated successfully",
            announcementData: updateData,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || "Internal Server Error",
        });
    }
}

exports.deleteAnnouncement = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const result = await Announcement.deleteOne({ _id: userId });

        if (result.deletedCount === 1) {
            res.status(200).json({
                message: 'data deleted successfully',
            });
        } else {
            res.status(404).json({
                message: 'data not found',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};
