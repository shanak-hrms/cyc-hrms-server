const mongoose = require('mongoose');
const claimRequestSchema = new mongoose.Schema({
    emp_id: String,
    name: String,
    message: String,
    claimsType: String,
    attachment: String
})

module.exports = mongoose.model("ClaimsRequest", claimRequestSchema)