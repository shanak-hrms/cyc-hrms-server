const SalaryStructure = require('../model/salarySchema');
const User =require("../model/user")

exports.addSalaryStructure = async (req, res) => {
    try {
        const {role}=req.user
        if (role !== "HR" && role !== "DIRECTOR" && role !== "MANAGER") {
            throw new Error("Only HR, DIRECTOR, or MANAGER are allowed to access.");
        }
        const {
            employeeId,
            basicSalary,
            hraPercentage,
            daPercentage,
            travelAllowance,
            ptaxDeduction,
            pfPercentage,
            esiPercentage,
            specialAllowance
        } = req.body;

        const isUserExist = await User.findById(employeeId);
        if (!isUserExist) {
            return res.status(401).json({
                message: 'User Not found.',
            });
        }

        const issalaryStructureExist = await SalaryStructure.findOne({employeeId});
        if (issalaryStructureExist) {
            return res.status(401).json({
                message: 'structure already created.You can update If require through update salary entry Point',
            });
        }
        const salaryStructure = new SalaryStructure({
            employeeId,
            basicSalary,
            hraPercentage,
            daPercentage,
            travelAllowance,
            ptaxDeduction,
            pfPercentage,
            esiPercentage,
            specialAllowance
        });

        await salaryStructure.save();
        res.status(201).json({ message: 'Salary structure added successfully', salaryStructure });
    } catch (error) {
        console.error('Error adding salary structure:', error);
        res.status(500).json({ error:error.message || 'Internal Server Error' });
    }
};


exports.getAllSalaryStructures = async (req, res) => {
  try {
    const {role}=req.user
    if (role !== "HR") {
        throw new Error("Only HR is allowed to access.");
    }
    const salaryStructures = await SalaryStructure.find().populate("employeeId",{name:1,email:1,branch:1,department:1,role:1,bankAccount:1,mobile:1,IFSC:1,uanNumber:1,bankName:1,esic:1});
    res.status(200).json({ salaryStructures });
  } catch (error) {
    console.error('Error fetching salary structures:', error);
    res.status(500).json({ error:error.message|| 'Internal Server Error' });
  }
};
