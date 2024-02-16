const mongoose = require('mongoose');
const userAgreementSchema = new mongoose.Schema({
    name:{type:String,required:true},
    agreementText: { type: String, required: true },
    version: { type: String, required: true },
  });
  
  const UserAgreement = mongoose.model('UserAgreement', userAgreementSchema);
  
  module.exports = UserAgreement;