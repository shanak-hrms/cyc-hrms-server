const Sequence=require("../model/empIdSequence")

exports.createInitialSequence=async(req,res)=>{
    try {
        const {sequenceName}=req.body
        const newSequence=new Sequence({sequenceName})
        if (!newSequence) {
            throw new Error("Sequence not created. Something went wrong")
        }
        await newSequence.save();

        res.status(201).json({message:`initial id generated for ${sequenceName} successfully`});
    } catch (err) {
         res.status(500).json({
            error: err.message || 'Internal Server Error',
        });
    }
}