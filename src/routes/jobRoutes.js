const express = require("express");
const { submitJob, getJobStatus } = require("../services/imageProcessor");
const router = express.Router();

// Submit a new job
router.post("/submit", submitJob);

// Get job status
router.get("/status", getJobStatus);

module.exports = router;
