const express = require("express");
const router = express.Router();
const { createComplaint, getComplaints, updateComplaintStatus } = require("../Controllers/ComplaintController");

router.post("/submit-complaint", createComplaint);
router.get("/getAllComplaint", getComplaints);

module.exports = router;
