const Plan = require('../Models/CreatePlanModel.js');

const createPlan = async (req, res) => {
  const { planName, speedLimits, cost, duration } = req.body;
  // Input validation
  if (!planName || !speedLimits || !cost || !duration) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const newPlan = new Plan({
      planName,
      speedLimits,
      cost,
      duration
    });
    const savedPlan = await newPlan.save();
    res.status(201).json({ message: 'Plan created successfully', plan: savedPlan });
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not create plan', error });
  }
};

module.exports = { createPlan };
