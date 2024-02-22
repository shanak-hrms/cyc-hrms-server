const express = require('express');
const Office = require('../model/officeLocation');

exports.addLocation = async (req, res) => {
    try {
      const {name, longitude, latitude} = req.body;
      const addnewLocation = new Office({name, longitude, latitude});
  
      const result = await addnewLocation.save();
      res.status(201).json({
        message: 'New location created successfully!',
        newLocation: result,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message || 'Internal Server Error',
      });
    }
  };

exports.getLocationById=async (req, res) => {
  try {
    const {locationId} = req.params;
    const location = await Office.findById(locationId);
    if (!location) {
      return res.status(404).json({
        message: 'Location not found',
      });
    }
    res.status(200).json({
      message: 'Location retrieved successfully',
      location: location,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message || 'Internal Server Error',
    });
  }
}


// exports.getLocation=async (req, res) => {
//   try {
//     const {locationId} = req.params;
//     const location = await Office.findById(locationId);
//     if (!location) {
//       return res.status(404).json({
//         message: 'Location not found',
//       });
//     }
//     res.status(200).json({
//       message: 'Location retrieved successfully',
//       location: location,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: err.message || 'Internal Server Error',
//     });
//   }
// }

exports.getLocation=async (req, res) => {
  try {
    const location = await Office.find();
    res.status(200).json({
      message: 'Location retrieved successfully',
      location: location,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message || 'Internal Server Error',
    });
  }
}
