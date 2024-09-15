const express = require('express');
const router = express.Router();
const { createPlan } = require('../Controllers/CreatePlanController.js');

// POST route to create a new plan
router.post('/create-plan', createPlan);

module.exports = router;
