const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true
  },
  speedLimits: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
},{ timestamps: true });

const Plan = mongoose.model('Create-Plan', planSchema);

module.exports = Plan;
