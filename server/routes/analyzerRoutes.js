import express from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/analyzerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", protect, upload.single("resumeFile"), analyzeResume);

export default router;