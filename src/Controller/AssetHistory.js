
const Asset = require('../Model/assetMaster');
const Employee = require('../Model/EmployModel');
const AssetHistory = require('../Model/AssetHistoryModel');

 const getHistory= async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    const employee = await Employee.findById(req.body.employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (!asset.isAvailable) {
      return res.status(400).json({ message: 'Asset is not available for assignment' });
    }

    // Update asset status
    asset.isAvailable = false;
    asset.assignedTo = employee.id;
    await asset.save();

    // Create asset history record
    const assetHistory = new AssetHistory({
      asset: asset.id,
      employee: employee.id,
      action: 'assign',
      date: new Date(),
      reason: `Asset assigned to employee ${employee.firstName} ${employee.lastName}`
    });
    await assetHistory.save();

    return res.status(200).json({
      message: 'Asset assigned successfully',
      asset: {
        id: asset.id,
        name: asset.name,
        serialNumber: asset.serialNumber,
        type: asset.type,
        make: asset.make,
        model: asset.model,
        purchaseDate: asset.purchaseDate,
        purchaseCost: asset.purchaseCost,
        assignedTo: employee,
        available: asset.isAvailable
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}




module.exports = { getHistory };
