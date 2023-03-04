const Router = require("express").Router();

const { createmploy, getuser, getdetailsbyid, updateemployee, deleteemployes } = require("../Controller/Employ");
const{createAssetcatagory, getAssetcatagory,getAssetCategoryById,updateAssetCategory,FindIDOOFAssetCategory}=require("../Controller/AssetCatagory")
const{createassetsmaster,getbyId, getassetbyId ,updateAsset,deleteasset}=require("../Controller/assetMaster")
const{CreateIssueAsset,getissueAsset , GetDetailsByEmpolyee,getdetailsbyAsset}=require("../Controller/IssueAsset")
const{CreateReturnAsset,returnAssetDetails}=require("../Controller/ReturnAsset")
const{ScrapCreate, GetScraapDetails}=require("../Controller/ScrapController")
const{getHistory}=require("../Controller/AssetHistory")

// CREATE employee
Router.post("/employees", createmploy);
// READ all employees
Router.get("/employees", getuser);
// READ employee by ID
Router.get("/employees/:id", getdetailsbyid);
// UPDATE employee by ID
Router.patch("/employees/:id", updateemployee);
// DELETE employee by ID
Router.delete("/employees/:id", deleteemployes);


// CREATE a new asset category
Router.post('/createAssetcatagory',createAssetcatagory)
// READ all asset categories
Router.get('/getAssetcatagory',getAssetcatagory)
 // READ a single asset category by ID
Router.get('/findbyId/:id',FindIDOOFAssetCategory,getAssetCategoryById)
 // UPDATE an existing asset category by ID
 Router.patch('/UpdatebyId/:id',FindIDOOFAssetCategory,updateAssetCategory)



// CREATE assetMaster
Router.post('/createassetsmaster', createassetsmaster)
// READ all assets
Router.get('/type',getbyId)
// READ asset by ID
Router.get('/assets/:id',getassetbyId)
// UPDATE asset by ID
Router.patch('/updateassets/:id',updateAsset)
// DELETE asset by ID
Router.delete('/assets/:id',deleteasset)





// CREATE a new asset issuance record
Router.post('/createIssue',CreateIssueAsset)
// // READ all asset issuance records
Router.get('/Getdetailsissue',getissueAsset)
// READ all issuances associated with a specific employee
Router.get('/employee/:employeeId',GetDetailsByEmpolyee)
// READ all issuances associated with a specific asset
Router.get('/asset/:assetId',getdetailsbyAsset)




// Create a new ReturnAsset record
Router.post('/CreateReturnAsset',CreateReturnAsset)
// Get all ReturnAsset records
Router.get('/ReturnAssetDetails',returnAssetDetails)



// Endpoint for scrapping an asset
Router.post('/ScrapCreate',ScrapCreate)
// Endpoint for retrieving all scrapped assets
Router.get('/GetScraapDetails',GetScraapDetails)

// Endpoint for retrieving the entire history of an asset
Router.get('/:id/history',getHistory)


module.exports = Router;
