const Sequence=require("../model/empIdSequence")

const getNextSequenceValue=async(sequenceName)=> {
    const sequenceDoc = await Sequence.findOneAndUpdate(
        { sequenceName: sequenceName },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
    );

    return sequenceDoc.sequenceValue;
}

module.exports={
    getNextSequenceValue
}