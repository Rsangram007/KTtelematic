
const IssueAsset = require('../Model/IssueAssetModel');
const Asset = require('../Model/assetMaster');
const Employee = require('../Model/EmployModel');

// CREATE a new asset issuance record
const CreateIssueAsset= async (req, res) => {
  try {
    const { assetId, employeeId } = req.body;

    // Validate input data
    if (!assetId || !employeeId) {
      return res.status(400).json({ message: 'Asset ID and employee ID are required' });
    }

    // Check that asset and employee exist
    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Check that asset is available to be issued
    if (!asset.isAvailable) {
      return res.status(400).json({ message: 'Asset is already issued' });
    }

    // Create new issuance record
    const issuance = new IssueAsset({
      asset: assetId,
      employee: employeeId,
      issuedDate: Date.now(),
      // Any other relevant issuance information can be included here
    });

    // Update asset status
    asset.isAvailable = false;
    await asset.save();

    // Save issuance record to database
    const savedIssuance = await issuance.save();
    res.status(201).json(savedIssuance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

 const getissueAsset=async (req, res) => {
  try {
    const issuances = await IssueAsset.find();
    res.json(issuances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

 const GetDetailsByEmpolyee=async (req, res) => {
  try {
    const issuances = await IssueAsset.find({ employee: req.params.employeeId });
    res.json(issuances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getdetailsbyAsset= async (req, res) => {
  try {
    const issuances = await IssueAsset.find({ asset: req.params.assetId });
    res.json(issuances);
  } catch (err){
    res.status(500).json({ message: err.message });
}
}
module.exports = {CreateIssueAsset ,getissueAsset, GetDetailsByEmpolyee,getdetailsbyAsset};