import express from 'express';
import CodeReview from '../models/CodeReview.js';
import { analyzeCode } from '../services/codeAnalysis.js';

const router = express.Router();

// Create new code review session
router.post('/', async (req, res) => {
    try {
      console.log("Incoming request body:", req.body); // Debug log
      
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Request body is empty" });
      }
      const { code } = req.body;
      
      if (!code) {
        return res.status(400).json({ error: "Code parameter is required" });
      }
      
      // Generate a random room ID for this code review session
      const roomId = Math.random().toString(36).substring(2, 8);
      console.log(`Generated roomId: ${roomId}`);
      
      // Analyze the code using the service
      console.log("Analyzing code...");
      let analysis;
      try {
        analysis = await analyzeCode(code);
        console.log("Code analysis completed successfully");
      } catch (analysisError) {
        console.error("Code analysis failed:", analysisError);
        return res.status(500).json({ error: "Failed to analyze code", details: analysisError.message });
      }
      
      // Create a new code review document
      console.log("Creating new code review document");
      const newReview = new CodeReview({
        code,
        suggestions: analysis.suggestions || [],
        optimizations: analysis.optimizations || [],
        issues: analysis.issues || [],
        timeComplexity: analysis.timeComplexity || {
          current: "Unknown",
          improvement: {
            suggestion: "",
            improvedCode: "",
            improvedComplexity: ""
          }
        },
        roomId,
        createdAt: new Date()
      });
      
      // Save to database
      console.log("Saving code review to database");
      try {
        await newReview.save();
        console.log(`Code review saved with ID: ${newReview._id}`);
      } catch (dbError) {
        console.error("Database save failed:", dbError);
        return res.status(500).json({ error: "Failed to save code review", details: dbError.message });
      }
      
      // Send successful response with full data
      res.status(201).json({
        _id: newReview._id,
        roomId: newReview.roomId,
        suggestions: newReview.suggestions,
        optimizations: newReview.optimizations,
        issues: newReview.issues,
        timeComplexity: newReview.timeComplexity,
        message: "Code review created successfully"
      });
    } catch (err) {
      console.error("Unhandled error in code review POST route:", err);
      res.status(500).json({ error: "Internal server error", details: err.message });
    }
  });

// Get code review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await CodeReview.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;