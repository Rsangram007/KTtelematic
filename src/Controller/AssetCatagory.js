const AssetCategory = require("../Model/assetCategory");

const createAssetcatagory = async (req, res) => {
  try {
    const assetCategory = new AssetCategory(req.body);
    const savedAssetCategory = await assetCategory.save();
    res.status(201).json(savedAssetCategory);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getAssetcatagory = async (req, res) => {
  try {
    const assetCategories = await AssetCategory.find();
    res.json(assetCategories);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAssetCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const getdetailsbyid = await AssetCategory.findById(id);
    return res.send(getdetailsbyid);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const updateAssetCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await AssetCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.send(data);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Middleware to retrieve an asset category by ID
async function FindIDOOFAssetCategory(req, res, next) {
  try {
    const assetCategory = await AssetCategory.findById(req.params.id);
    if (assetCategory == null) {
      return res
        .status(404)
        .json({ message: "Asset category not found in this id" });
    }
    res.assetCategory = assetCategory;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createAssetcatagory,
  getAssetcatagory,
  getAssetCategoryById,
  updateAssetCategory,
  FindIDOOFAssetCategory,
};
