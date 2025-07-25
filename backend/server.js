const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const resumeRoutes = require("./resumeRoutes");
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
