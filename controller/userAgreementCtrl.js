const Agreement=require("../model/userAgreement")

exports.createUserAgreement=async(req,res)=>{
    try {
        const {agreementText,name,version="v1.0.0"}=req.body
        const isExistingAgreement=await Agreement.findOne({name:name.toLowerCase()})
        if(isExistingAgreement){
            throw new Error("Agreement already exist with this name.")
        }
        const newAgreement=new Agreement({agreementText,name:name.toLowerCase(),version})
        if (!newAgreement) {
            throw new Error("Agreement not created. Something went wrong")
        }
        await newAgreement.save();

        res.status(201).json({message:`New Agreement created successfully`});
    } catch (err) {
         res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
}


exports.updateUserAgreement = async (req, res) => {
    try {
        const { agreementText, name ,version} = req.body;
        const existingAgreement = await Agreement.findOne({ name: name.toLowerCase() });
        if (!existingAgreement) {
            return res.status(404).json({ error: "Agreement not found" });
        }
        existingAgreement.agreementText = agreementText;
        existingAgreement.version = version;
        
        await existingAgreement.save();

        res.status(200).json({ message: `Agreement '${name}' updated successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getAgreement = async (req, res) => {
    try {
        const { name } = req.query;

        const agreement = await Agreement.findOne({ name: name.toLowerCase() });
        if (!agreement) {
            return res.status(404).json({ error: "Agreement not found" });
        }

        res.status(200).json({ agreement });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




