import express from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/analyzerController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("resumeFile"), analyzeResume);

export default router;