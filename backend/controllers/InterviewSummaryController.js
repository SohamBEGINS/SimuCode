const InterviewSummary = require('../models/InterviewSummary');
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Save a new interview summary
exports.saveSummary = async (req, res) => {
  try {
    const { userId, difficulty, stages } = req.body;
    if (!userId || !difficulty || !stages) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const summary = new InterviewSummary({ userId, difficulty, stages });
    await summary.save();
    res.status(201).json({ success: true, summary });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save summary', details: err.message });
  }
};

// Get all summaries for a user
exports.getSummariesForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const summaries = await InterviewSummary.find({ userId }).sort({ date: -1 });
    res.json({ success: true, summaries });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summaries', details: err.message });
  }
};

// (Optional) Get a single summary by ID
exports.getSummaryById = async (req, res) => {
  try {
    const { id } = req.params;
    const summary = await InterviewSummary.findById(id);
    if (!summary) return res.status(404).json({ error: 'Summary not found' });
    res.json({ success: true, summary });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary', details: err.message });
  }
};

exports.getClarificationFeedback = async (req, res) => {
    const { question, clarifications, difficulty } = req.body;
  
    // Edge case: No clarifications asked
    if (!clarifications || clarifications.length === 0) {
      return res.json({
        quality: "None",
        comments: [
          "No clarifying questions were asked. In real interviews, it's often helpful to clarify constraints, edge cases, or input/output details."
        ]
      });
    }
  
    const prompt = `
  You are an expert coding interview evaluator.
  Given the following coding problem and the candidate's clarifying questions, rate the quality of their clarifications and provide feedback.
  
  PROBLEM: "${question}"
  DIFFICULTY: ${difficulty}
  CLARIFICATION QUESTIONS:
  ${clarifications.map((q, i) => `${i + 1}. ${q}`).join('\n')}
  
  Your response should be in this JSON format:
  {
    "quality": "Excellent" | "Good" | "Average" | "Poor",
    "comments": ["..."]
  }
  
  - "Excellent": All clarifications are relevant and not redundant.
  - "Good": Most clarifications are relevant, maybe one minor redundancy.
  - "Average": Some clarifications are redundant or obvious.
  - "Poor": Mostly redundant, obvious, or missing important clarifications.
  `;
  
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 400
      });
  
      const feedback = JSON.parse(response.choices[0].message.content);
      res.json(feedback);
    } catch (error) {
      console.error('Clarification feedback AI error:', error);
      res.status(500).json({ error: 'Failed to get clarification feedback', details: error.message });
    }
  };