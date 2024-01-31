const express = require('express');
const router = express.Router();
const Invoice = require('../model/invoice');

exports.getInvoices=async (req, res) => {
    try {
        const result = await Invoice.find();
        res.status(200).json({
            invoiceData: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

exports.createInvoice=async (req, res) => {
    try {
        const createInvoice = new Invoice({
            invoiceNo: {
                invoice: req.body.invoice,
                date: req.body.date,
            },
            clientInfo: {
                businessName: req.body.businessName,
                clientIndustry: req.body.clientIndustry,
                country: req.body.country,
                city: req.body.city,
            },
            invoiceItem: {
                amount: req.body.amount,
                gst: req.body.gst,
                item: req.body.item,
                quantity: req.body.quantity,
            },
            termsConditions: {
                term: req.body.term,
            },
            additionalNotes: {
                note: req.body.note,
            },
            constactDetails: {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
            },
        });

        const result = await createInvoice.save();
        res.status(200).json({
            new_invoice: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
};

