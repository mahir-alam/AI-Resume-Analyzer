
// What is a route?
// A route defines the API endpoint (URL) and connects it to a controller.
// It handles incoming requests and delegates logic to controllers.

// Route: GET /api/message
// This calls the controller function to handle the request

import express from "express";
import { getMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/", getMessage);

export default router;