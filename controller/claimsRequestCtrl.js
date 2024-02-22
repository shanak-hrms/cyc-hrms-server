const TravelClaim = require('../model/claimsRequest');

exports.requestClaim = async (req, res) => {
    try {
        const { _id: employeeId } = req.user
        const { claimName, claimAmount } = req.body;
        const threshold = 2000;
        console.log("claims", employeeId, claimName, claimAmount)
        if (claimAmount > threshold) {
            return res.status(400).json({ message: 'Claim amount exceeds threshold.' });
        }

        let needApprovalFrom = ['MANAGER', 'HR', 'DIRECTOR'];
        const newClaim = new TravelClaim({ employeeId, claimName, claimAmount,needApprovalFrom });
        await newClaim.save();
        res.json(newClaim);
    } catch (error) {
        res.status(500).json({ message: error.message ||"Internal server Error" });
    }
};

exports.approveClaim = async (req, res) => {
    try {
        const { claimId } = req.params;
        const { _id: approverId, role } = req.user;

        const claim = await TravelClaim.findById(claimId);
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }

        // Check if the current user is authorized to approve the claim
        if (!claim.needApprovalFrom.includes(role)) {
            return res.status(403).json({ error: 'You are not authorized to approve this request' });
        }

        claim.approver = { approverId, role };
        claim.status = 'Approved';
        await claim.save();

        res.json({ message: 'Claim approved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message ||"Internal server error" });
    }
};

exports.rejectClaim = async (req, res) => {
    try {
        const { claimId } = req.params;
        const { _id:approverId, role } = req.user;

        const claim = await TravelClaim.findById(claimId);
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }

        if (!claim.needApprovalFrom.includes(role)) {
            return res.status(403).json({ error: 'You are not authorized to approve this request' });
        }

        claim.status = 'Rejected';
        claim.approver = { approverId, role };

        await claim.save();

        res.json({ message: 'Claim rejected successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message ||"Internal server error"});
    }
};

exports.getAllClaimsOfUser = async (req, res) => {
    try {
      const { _id:userId } = req.user;  
      const claims = await TravelClaim.find({ employeeId: userId });
      res.status(200).json({claimData:claims});
    } catch (error) {
      res.status(500).json({ message: error.message ||"Internal server error" });
    }
  };

exports.getAllPendingClaims = async (req, res) => {
    try {
      const {role } = req.user; 
      if (role !== "HR" && role !== "DIRECTOR" && role !== "MANAGER") {
        throw new Error("Only HR, DIRECTOR, or MANAGER are allowed to access.");
    } 
      const claims = await TravelClaim.find({ status: "Pending" });
      res.status(200).json({claimData:claims});
    } catch (error) {
      res.status(500).json({ message: error.message ||"server error" });
    }
  };