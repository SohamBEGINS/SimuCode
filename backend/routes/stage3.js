const express = require('express')
const router = express.Router();
const stage3Controller = require('../controllers/stage3Controller');

// Analyze user's approach and get follow-up questions
router.post('/analyze-approach', stage3Controller.analyzeApproach);


// Get validated approaches for Stage 4
router.get('/data/:sessionId', stage3Controller.getStage3Data);

module.exports = router;
