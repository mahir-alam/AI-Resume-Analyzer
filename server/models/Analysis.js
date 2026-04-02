import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeText: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      default: "",
    },
    analysisResult: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;