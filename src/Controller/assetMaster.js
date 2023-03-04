const Asset = require("../Model/assetMaster");




const createassetsmaster=async (req, res) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.status(201).send(asset);
  } catch (err) {
    res.status(400).send(err);
  }
}

const getbyId= async (req, res) => {
  const { type, make, model } = req.query;
  const query = {isdeleted: true};
  if (type) {
    query.type = type;
    query["type"] = { "$regex": type }
  }
  if (make) {
    query.make = make;
    query["make"] = { "$regex": make }
  }
  if (model) {
    query.model = model;
    
    query["model"] = { "$regex": model }
   }
  try {
    const assets = await Asset.find();
    res.send(assets);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const getassetbyId= async (req, res) => {
  const { id } = req.params;
  try {
    const asset = await Asset.findById(id);
    if (!asset) {
      res.status(404).send();
    } else {
      res.send(asset);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
const updateAsset= async (req, res) => {
  const { id } = req.params;
  try {
    const asset = await Asset.findByIdAndUpdate(id, req.body, { new: true });
    if (!asset) {
      res.status(404).send();
    } else {
      res.send(asset);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

const deleteasset= async (req, res) => {
  const { id } = req.params;
  try {
    const asset = await Asset.findByIdAndDelete(id);
    if (!asset) {
      res.status(404).send();
    } else {
      res.send("Delete Sucessfully");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}




module.exports={createassetsmaster ,getbyId , getassetbyId ,updateAsset , deleteasset}