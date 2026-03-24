const express = require("express");
const router = express.Router();

// What is a route?
// A route defines the API endpoint (URL) and connects it to a controller.
// It handles incoming requests and delegates logic to controllers.

const { getMessage } = require("../controllers/messageController");

// Route: GET /api/message
// This calls the controller function to handle the request
router.get("/", getMessage);

module.exports = router;