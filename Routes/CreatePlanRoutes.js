const express = require('express');
const router = express.Router();
const { createPlan, getAllPlans } = require('../Controllers/CreatePlanController.js');

// POST route to create a new plan
router.post('/create-plan', createPlan);
router.get('/getallplans', getAllPlans);


module.exports = router;
