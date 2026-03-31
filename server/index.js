// Why separate routes and controllers?
// To keep the code modular, scalable, and maintainable.
// Controllers handle the business logic of the application and process requests.
// Routes define API endpoints and map them to controller functions.

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const messageRoutes = require("./routes/messageRoutes");
const analyzerRoutes = require("./routes/analyzerRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Connect route to API path
// All requests to /api/message will be handled by messageRoutes
app.use("/api/message", messageRoutes);
app.use("/api/analyzer", analyzerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});