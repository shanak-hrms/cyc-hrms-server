const CompOffDay = require("../model/compOff")

exports.applyForCompOffDay = async (req, res) => {
    try {
        const {_id:employeeId}=req.user
        const {dateOfRequest } = req.body;

        // Check if the request and usage occur within the same month
        const currentMonth = new Date().getMonth();
        if (new Date(dateOfRequest).getMonth() !== currentMonth) {
            return res.status(400).json({ error: 'Comp time request must be within the same month' });
        }

        const existingCompOff = await CompOffDay.findOne({ employeeId, dateOfRequest });
        if (existingCompOff) {
            return res.status(400).json({ error: 'CompOff already made for the same date' });
        }
        const compTime = new CompOffDay({
            employeeId,
            dateOfRequest,
        });
        await compTime.save();
        res.status(201).json(compTime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
};

exports.approveCompOff = async (req, res) => {
    try {
        const { compOffId } = req.params;
        const { role } = req.user
        if (role !== "HR") {
            throw new Error("Only HR is allowed to approve compOff.");
        }
        
        const compOff = await CompOffDay.findById(compOffId);
        if (!compOff) {
            return res.status(404).json({ error: 'Comp Off not found' });
        }
        compOff.approved = true;
        await compOff.save();

        res.json(compOff);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.useCompOffDay = async (req, res) => {
    try {
        const { compOffId, dateOfUsage } = req.body;

        // Check if the usage date is within the same month
        const currentMonth = new Date().getMonth();
        if (new Date(dateOfUsage).getMonth() !== currentMonth) {
            return res.status(400).json({ error: 'Comp time usage must be within the same month' });
        }

        // Additional validation and business logic can be added here

        const compOff = await CompOffDay.findById(compOffId);
        if (!compOff) {
            return res.status(404).json({ error: 'Comp time not found' });
        }

        if (!compOff.approved) {
            return res.status(400).json({ error: 'Comp Off has not been approved yet' });
        }
        if (compOff.dateOfUsage) {
            return res.status(400).json({ error: 'Comp Off has already been used' });
        }
        compOff.dateOfUsage = dateOfUsage;
        await compOff.save();
        res.json(compOff);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message||'Server error' });
    }
};

exports.getCompOffCount = async (req, res) => {
    try {
        const {_id:employeeId}=req.user
        const { month, year } = req.query;
        console.log(month,year)
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const compOffCount = await CompOffDay.countDocuments({
            employeeId,
            dateOfRequest: { $gte: startDate, $lte: endDate },
            approved: true,
            dateOfUsage: { $ne: null }
        });

        res.json({ compOffCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getCompOffEmployeeList= async (req, res) => {
    try {
        const {_id:employeeId}=req.user
        const { month, year } = req.query;
        console.log(month,year)
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const compOffCount = await CompOffDay.find({
            employeeId,
            dateOfRequest: { $gte: startDate, $lte: endDate },
        });

        res.json({ compOffCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.getCompOffList = async (req, res) => {
    try {
        const { month, year } = req.query;
        console.log(month,year)  
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const compOffCount = await CompOffDay.find({
            dateOfRequest: { $gte: startDate, $lte: endDate },
        });

        res.json({ compOffCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};