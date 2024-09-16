const express = require("express");
const router = express.Router();
const { createComplaint, getComplaints } = require("../Controllers/ComplaintController");

router.post("/submit-complaint", createComplaint);
router.get("/getAllComplaint", getComplaints);

module.exports = router;
