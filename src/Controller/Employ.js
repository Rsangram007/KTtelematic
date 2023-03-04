const Employee = require("../Model/EmployModel");

const createmploy = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    return res.status(201).send(employee);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getuser = async (req, res) => {
  const { isActive } = req.query;

  try {
    const employees = await Employee.find({ isActive });
    return res.send(employees);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getdetailsbyid = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      res.status(404).send();
    } else {
      return res.send(employee);
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

const updateemployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(404).send({ data: "No Empolyee found " });
    } else {
      return res.send(employee);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deleteemployes = async (req, res) => {
  const { id } = req.params;

  try {
    await Employee.findByIdAndDelete(req.params.id);
    return res.status(200).send("Product has been deleted...");
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createmploy,
  getuser,
  getdetailsbyid,
  updateemployee,
  deleteemployes,
};
