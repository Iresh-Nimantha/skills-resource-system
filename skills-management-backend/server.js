const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const personnelRoutes = require("./routes/personnel.routes");
const skillRoutes = require("./routes/skill.routes");
const projectRoutes = require("./routes/project.routes");
const matchRoutes = require("./routes/match.routes");
const personnelSkillRoutes = require("./routes/personnelSkill.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON request bodies

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API Routes
app.use("/api/personnel", personnelRoutes); // CRUD for personnel
app.use("/api/skills", skillRoutes); // CRUD for skills
app.use("/api/projects", projectRoutes); // CRUD for projects
app.use("/api/personnel-skills", personnelSkillRoutes); // Assign skills to personnel
app.use("/api/match", matchRoutes); // Matching endpoint

// personnel skills routes
// app.use("/api/personnel-skills", personnelSkillRoutes);

// Error handling for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
