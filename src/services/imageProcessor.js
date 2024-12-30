const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

// In-memory job store
const jobs = new Map();

// Submit a new job
const submitJob = async (req, res) => {
    const { count, visits } = req.body;

    // Validation
    if (!count || !visits || count !== visits.length) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    // Generate a unique job ID
    const jobId = uuidv4();
    jobs.set(jobId, { status: "ongoing", results: [], errors: [] });

    // Process images in the background
    processJob(jobId, visits);

    return res.status(201).json({ job_id: jobId });
};

// Get job status
const getJobStatus = (req, res) => {
    const { jobid } = req.query;

    if (!jobid || !jobs.has(jobid)) {
        return res.status(400).json({ error: "Job ID not found" });
    }

    const job = jobs.get(jobid);
    return res.status(200).json(job);
};

// Helper: Process job in the background
const processJob = async (jobId, visits) => {
    const job = jobs.get(jobId);

    try {
        for (const visit of visits) {
            const { store_id, image_url } = visit;

            for (const url of image_url) {
                try {
                    // Download image metadata
                    const response = await axios.head(url);
                    const height = parseInt(response.headers["content-length"] || 100);
                    const width = 100; // Placeholder, use real dimensions if available

                    // Calculate perimeter
                    const perimeter = 2 * (height + width);

                    // Simulate GPU processing
                    await new Promise((resolve) =>
                        setTimeout(resolve, Math.random() * 300 + 100)
                    );

                    // Store result
                    job.results.push({ store_id, image_url: url, perimeter });
                } catch (error) {
                    job.errors.push({ store_id, error: error.message });
                }
            }
        }

        // Mark job as completed
        job.status = job.errors.length ? "failed" : "completed";
    } catch (error) {
        job.status = "failed";
        job.errors.push({ error: error.message });
    }
};

module.exports = { submitJob, getJobStatus };
