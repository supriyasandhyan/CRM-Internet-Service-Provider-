const AddEmp = require('../Models/EmpModel');

const addEmpLogic = async (req, res) => {
  const { EmpID, EmpName, EmpContact, EmpEmail, EmpLocation } = req.body;
  // Input validation
  if (!EmpID || !EmpName || !EmpContact || !EmpEmail || !EmpLocation) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {

    const existingUser = await AddEmp.findOne({ EmpID , EmpEmail });
    if (existingUser) {
        return res.status(400).send("Employee already exists");
    }

    const newEmp = new AddEmp({
      EmpID,
      EmpName,
      EmpContact,
      EmpEmail,
      EmpLocation
    });
    const savedEmp = await newEmp.save();
    res.status(201).json({ message: 'Employee Added successfully', AddEmp: savedEmp });
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not add emp', error });
  }
};


//-----get emp------//
const getAllEmpsLogic = async (req, res) => {
  try {
    const employees = await AddEmp.find(); // Fetch all employees from the database
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not retrieve employees', error });
  }
};

// edit employee 
const editEmpLogic = async (req, res) => {
  const { id } = req.params;
  const { EmpName, EmpContact, EmpEmail, EmpLocation } = req.body;

  // Input validation
  if (!EmpName && !EmpContact && !EmpEmail && !EmpLocation) {
    return res.status(400).json({ message: 'At least one field is required for update' });
  }

  try {
    // Find employee by ID and update details
    const updatedEmp = await AddEmp.findOneAndUpdate(
      { EmpID: id }, // Find employee by ID
      { EmpName, EmpContact, EmpEmail, EmpLocation }, // Fields to update
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedEmp) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmp });
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not update employee', error });
  }
};

// Delete employee
const deleteEmpLogic = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete employee by ID
    const deletedEmp = await AddEmp.findOneAndDelete({ EmpID: id });

    if (!deletedEmp) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmp });
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not delete employee', error });
  }
};

module.exports = { addEmpLogic, getAllEmpsLogic, editEmpLogic, deleteEmpLogic };







