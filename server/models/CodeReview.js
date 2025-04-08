import mongoose from 'mongoose';

const codeReviewSchema = new mongoose.Schema({
  code: { type: String, required: true },
  suggestions: { type: Array, default: [] },
  optimizations: { type: Array, default: [] },
  issues: { type: Array, default: [] },
  timeComplexity: { 
    current: { type: String, default: "Unknown" },
    improvement: {
      suggestion: { type: String, default: "" },
      improvedCode: { type: String, default: "" },
      improvedComplexity: { type: String, default: "" }
    }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  roomId: { type: String, unique: true },
  participants: { type: Array, default: [] }
});

const CodeReview = mongoose.model('CodeReview', codeReviewSchema);

export default CodeReview;