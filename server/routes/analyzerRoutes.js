const express = require("express");
const router = express.Router();

const { analyzeResume } = require("../controllers/analyzerController");

router.post("/", analyzeResume);

module.exports = router;