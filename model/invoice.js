const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNo: {
        invoice: Number,
        date: String
    },
    clientInfo: {
        businessName: String,
        city: String,
        clientIndustry: String,
        country: String
    },
    invoiceItem: {
        amount: Number,
        gst: Number,
        item: String,
        quantity: Number
    },
    termsConditions: {
        term: String
    },
    additionalNotes: {
        note: String
    },
    constactDetails: {
        name: String,
        phone: Number,
        email: String
    }

})

module.exports = mongoose.model("Invoice", invoiceSchema)