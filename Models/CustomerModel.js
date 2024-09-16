const mongoose = require('mongoose');

// Define the schema for a customer
const customerSchema = new mongoose.Schema({
  CustName: {
    type: String,
    required: true,
  },
  CustContact: {
    type: String,
    required: true,
  },
  CustEmail: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique
  },
  CustGender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  CustBusiness: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  BusinessType: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: function () {
      return this.CustBusiness === 'Yes'; // Only required if CustBusiness is "Yes"
    }
  },
  Region: {
    type: String,
    required: true,
  },
  SelectPlan: {
    type: String,
    enum: ['15MBPS', '30MBPS', '45MBPS'],
    required: true,
  },
  dateInput: {
    type: Date,
  },
}, { timestamps: true });

// Create a model from the schema
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
