
const Asset = require('../Model/assetMaster');
const ScrappedAsset = require('../Model/ScrappedAssetModel');



 const ScrapCreate = async (req, res) => {
  try {
    const { assetId, reason } = req.body;

    // Check if the asset exists
    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    // Set the asset to unavailable
    asset.isAvailable = false;
    await asset.save();

    // Create a new ScrappedAsset document
    const scrappedAsset = new ScrappedAsset({ asset: assetId, reason });
    await scrappedAsset.save();

    return res.status(201).json({ message: 'Asset scrapped successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

 const GetScraapDetails = async (req, res) => {
  try {
    const scrappedAssets = await ScrappedAsset.find().populate('asset');
    return res.status(200).json(scrappedAssets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {ScrapCreate, GetScraapDetails};
