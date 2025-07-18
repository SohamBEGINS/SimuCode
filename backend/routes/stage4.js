const express = require('express')
const router = express.Router();

const {analyzeCodeWithAI} = require('../controllers/stage4Controller');

router.post('/analyze-code', async (req, res) => {
    const { code, approach, question, difficulty } = req.body;
    if (!code || !approach || !question || !difficulty) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields.' });
    }
  
    
    try {
      const aiResult = await analyzeCodeWithAI({ code, approach, question, difficulty });
      
      if (aiResult.status === 'correct') {
        return res.json({ status: 'correct' });
      } else {
        return res.json({ status: 'error', message: aiResult.message });
      }
    } catch (err) {
      console.error('Stage 4 analyze-code error:', err);
      return res.status(500).json({ status: 'error', message: 'AI analysis failed.' });
    }
  });
  
  module.exports = router;