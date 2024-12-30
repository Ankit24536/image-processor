const express = require("express");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", jobRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
