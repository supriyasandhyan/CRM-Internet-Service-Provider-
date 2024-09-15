const mongoose = require("mongoose");

const empSchema = new mongoose.Schema(
  {
    EmpID: {
      type: String,
      required: true,
    },
    EmpName: {
      type: String,
      required: true,
    },
    EmpContact: {
      type: Number,
      required: true,
    },
    EmpEmail: {
      type: String,
      required: true,
    },
    EmpLocation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AddEmp = mongoose.model("Add-Emp", empSchema);

module.exports = AddEmp;
