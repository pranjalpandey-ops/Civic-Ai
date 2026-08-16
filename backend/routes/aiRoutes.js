import express from 'express';
import { aiService } from '../services/aiService.js';
import { calculatePriorityScore } from '../services/priorityService.js';

const router = express.Router();

// Analyze image
router.post('/analyze', async (req, res) => {
  try {
    const { imageUrl, filename, userHint, locationHint } = req.body;
    const result = await aiService.analyzeImage({ imageUrl, filename, userHint, locationHint });
    res.json(result);
  } catch (error) {
    console.error('AI Analysis failed:', error);
    res.status(500).json({ error: 'AI Analysis failed' });
  }
});

// Calculate priority explicitly
router.post('/calculate-priority', (req, res) => {
  const { severity, reportCount, category, locationName } = req.body;
  const result = calculatePriorityScore({ severity, reportCount, category, locationName });
  res.json(result);
});

export default router;
