const express = require('express');
const { addCustomer, getAllCustomers, updateCustomer, deleteCustomer } = require('../Controllers/CustController');
const router = express.Router();

// POST route to create a new plan
router.post('/add-cust', addCustomer);
router.get('/get-cust', getAllCustomers);
router.put('/edit-cust/:id', updateCustomer);
router.delete('/delete-cust/:id', deleteCustomer);

module.exports = router;
