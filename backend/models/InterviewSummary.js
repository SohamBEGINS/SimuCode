const mongoose = require("mongoose");

const StageSummarySchema = new mongoose.Schema({
  stage: { type: Number, required: true }, // 1, 2, 3, 4
  summary: { type: mongoose.Schema.Types.Mixed, required: true }, // Flexible for each stage
  feedback: { type: mongoose.Schema.Types.Mixed }, // Only for stage 2
});

const InterviewSummarySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Or ObjectId if you have a User model
  date: { type: Date, default: Date.now },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  stages: [StageSummarySchema]
});

module.exports = mongoose.model("InterviewSummary", InterviewSummarySchema);