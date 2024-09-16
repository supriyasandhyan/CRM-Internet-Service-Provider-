const Customer = require('../Models/CustomerModel');

const addCustomer = async (req, res) => {
  try {
    const {
      CustName,
      CustContact,
      CustEmail,
      CustGender,
      CustBusiness,
      BusinessType,
      Region,
      SelectPlan,
      dateInput
    } = req.body;

    // Input validation
    if (!CustName || !CustContact || !CustEmail || !CustGender || !CustBusiness || !Region || !SelectPlan) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // BusinessType should be provided only if CustBusiness is "Yes"
    if (CustBusiness === 'Yes' && !BusinessType) {
      return res.status(400).json({ message: 'BusinessType is required when CustBusiness is "Yes"' });
    }

    // Create a new customer instance
    const newCustomer = new Customer({
      CustName,
      CustContact,
      CustEmail,
      CustGender,
      CustBusiness,
      BusinessType: CustBusiness === 'Yes' ? BusinessType : undefined, // Set to undefined if CustBusiness is "No"
      Region,
      SelectPlan,
      dateInput
    });

    // Save the customer to the database
    const savedCustomer = await newCustomer.save();
    res.status(201).json({ message: 'Customer added successfully', customer: savedCustomer });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ message: 'Server error, could not add customer', error });
  }
};


// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not retrieve customers', error });
  }
};

// Update a customer by ID
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const {
    CustName,
    CustContact,
    CustEmail,
    CustGender,
    CustBusiness,
    BusinessType,
    Region,
    SelectPlan,
    dateInput
  } = req.body;

  // Input validation
  if (!CustName && !CustContact && !CustEmail && !CustGender && !CustBusiness && !Region && !SelectPlan) {
    return res.status(400).json({ message: 'At least one field is required for update' });
  }

  try {
    // Find and update the customer
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        CustName,
        CustContact,
        CustEmail,
        CustGender,
        CustBusiness,
        BusinessType,
        Region,
        SelectPlan,
        dateInput
      },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not update customer', error });
  }
};

// Delete a customer by ID
const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the customer
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer deleted successfully', customer: deletedCustomer });
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not delete customer', error });
  }
};

module.exports = {
  addCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
};
