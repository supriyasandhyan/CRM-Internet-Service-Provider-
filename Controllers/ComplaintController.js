const Complaint = require('../Models/ComplaintModel'); // Adjust the path as needed
const Customer = require('../Models/CustomerModel'); // Adjust the path as needed

// Create a new complaint
exports.createComplaint = async (req, res) => {
  try {
    // Find the customer by email
    const customer = await Customer.findOne({ CustEmail: req.body.CustEmail });

    if (!customer) {
      return res.status(400).json({ message: 'Customer not found' });
    }

    // Create a new complaint
    const complaint = new Complaint({
      CustEmail: customer._id, // Use the customer's ObjectId
      CustName: req.body.CustName,
      complaint: req.body.complaint,
      date: req.body.date
    });

    // Save the complaint to the database
    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all complaints
exports.getComplaints = async (req, res) => {
    try {
      // Fetch complaints and populate the CustEmail field with customer details
      const complaints = await Complaint.find().populate({
        path: 'CustEmail',
        select: 'CustName CustEmail' // Specify fields to include from the Customer model if needed
      });
  
      // Return the complaints with populated customer data
      res.status(200).json(complaints);
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({ message: error.message });
    }
  };