import express from "express";
import { analyzeResume } from "../controllers/analyzerController.js";

const router = express.Router();

router.post("/", analyzeResume);

export default router;