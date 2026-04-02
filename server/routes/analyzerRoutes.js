import express from "express";
import multer from "multer";
import {
  analyzeResume,
  getUserAnalyses,
  deleteAnalysis,
  saveAnalysis,
} from "../controllers/analyzerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/history", protect, getUserAnalyses);
router.delete("/:id", protect, deleteAnalysis);
router.post("/save", protect, saveAnalysis);
router.post("/", upload.single("resumeFile"), analyzeResume);

export default router;