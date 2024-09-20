const mongoose = require("mongoose");

// Import the Customer model
const Customer = require("../Models/CustomerModel"); // Adjust the path as needed

const complaintSchema = new mongoose.Schema({
  CustEmail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Reference to the Customer model
    required: true,
  },
  CustName: {
    type: String,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

// Create a model using the schema
const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;