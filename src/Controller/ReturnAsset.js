const ReturnAsset = require('../Model/ReturnAssetModel');
const Asset = require("../Model/assetMaster");
const Employee = require('../Model/EmployModel');

 const CreateReturnAsset=async (req, res) => {
  try {
    const { assetId, employeeId, reason } = req.body;

    // Validate input data
    if (!assetId || !employeeId || !reason) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Check that the asset and employee exist
    const asset = await Asset.findById(assetId);
    const employee = await Employee.findById(employeeId);
    if (!asset || !employee) {
      return res.status(404).json({ message: 'Asset or employee not found' });
    }

    // Create a new ReturnAsset document
    const returnAsset = new ReturnAsset({
      asset: assetId,
      employee: employeeId,
      returnDate: Date.now(),
      reason,
    });
    await returnAsset.save();

    // Set the asset to be available again
    asset.isAvailable = true;
    await asset.save();

    res.status(201).json({ message: 'Asset returned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

 const returnAssetDetails=async (req, res) => {
  try {
    const returnAssets = await ReturnAsset.find().populate('asset').populate('employee');
    res.json(returnAssets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {CreateReturnAsset,returnAssetDetails};
