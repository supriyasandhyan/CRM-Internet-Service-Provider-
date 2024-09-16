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

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    
    if (!plans || plans.length === 0) {
      return res.status(404).json({ message: 'No plans found' });
    }

    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not retrieve plans', error });
  }
};

module.exports = { createPlan, getAllPlans };
