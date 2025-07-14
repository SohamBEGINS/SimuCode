// backend/controllers/stage3Controller.js

const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// In-memory storage for session data (in production, use Redis or MongoDB)
const sessionData = new Map();

/**
 * Stage 3 Agent: Analyzes user approaches and gives immediate verdict/feedback.
 */
class Stage3ApproachAgent {
  /**
   * Analyzes a user's approach and gives verdict/feedback.
   * @param {Object} approach - User's approach data
   * @param {string} question - The original coding problem
   * @param {string} difficulty - Problem difficulty level
   * @returns {Object} Analysis result with verdict, feedback, and suggestion
   */
  async analyzeAndRespond(approach, question, difficulty) {
    const prompt = `
You are a coding interview AI.Respond in minimum words as possible . Analyze the candidate's approach for the following problem:

PROBLEM: "${question}"
DIFFICULTY: ${difficulty}

CANDIDATE'S APPROACH:
- Description: ${approach.description}
- Time Complexity: ${approach.timeComplexity}
- Space Complexity: ${approach.spaceComplexity}

Your task:
1. If the approach is incorrect, explain why and ask the candidate to try again.
2. If the approach is correct but not optimal, explain why but dont tell the efficient solution just ask the candidate to improve time or space complexity if possible.
3. If the approach is correct and optimal, say so and tell the candidate they can proceed to coding.
Do not spit out the solution .

Respond in this JSON format:
{
  "verdict": "INCORRECT" | "SUBOPTIMAL" | "OPTIMAL",
  "canProceed": true/false,
  "feedback": "Your feedback and explanation here.",
  "suggestion": "Prompt for next action (e.g., 'Try again', 'Can you improve?', 'Proceed to coding')"
}
`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 400
      });

      const result = JSON.parse(response.choices[0].message.content);
      return result;
    } catch (error) {
      console.error('Stage 3 approach analysis error:', error);
      throw new Error('Failed to analyze approach');
    }
  }
}

// Initialize the agent
const approachAgent = new Stage3ApproachAgent();

/**
 * Controller function: Analyzes user's approach and gives verdict/feedback.
 * This is called when user submits an approach in the table.
 */
exports.analyzeApproach = async (req, res) => {
  const { sessionId, approach, question, difficulty } = req.body;

  if (!sessionId || !approach || !question || !difficulty) {
    return res.status(400).json({
      error: 'Missing required fields: sessionId, approach, question, difficulty'
    });
  }

  try {
    // Analyze the approach using the new agent method
    const analysis = await approachAgent.analyzeAndRespond(approach, question, difficulty);

    // Initialize session if needed
    if (!sessionData.has(sessionId)) {
      sessionData.set(sessionId, { approaches: [], currentStage: 3 });
    }
    const session = sessionData.get(sessionId);

    // Store the approach if it's optimal
    if (analysis.verdict === "INCORRECT") {
      session.approaches.push({
        ...approach,
        verdict: analysis.verdict,
        feedback: analysis.feedback
      });
    }

    // Check if user can proceed (at least one optimal approach)
    const canProceed = session.approaches.some(a => a.verdict === "OPTIMAL" || a.verdict == "SUBOPTIMAL");

    res.json({
      success: true,
      verdict: analysis.verdict,
      feedback: analysis.feedback,
      suggestion: analysis.suggestion,
      canProceed
    });

  } catch (error) {
    console.error('Stage 3 analyze approach error:', error);
    res.status(500).json({
      error: 'Failed to analyze approach',
      details: error.message
    });
  }
};

/**
 * Controller function: Gets session data for Stage 4.
 * This provides the validated approaches to the coding stage.
 */
exports.getStage3Data = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = sessionData.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Return only optimal approaches for Stage 4
    const correctApproaches = session.approaches.filter(
        a => a.verdict === 'SUBOPTIMAL' || a.verdict === 'OPTIMAL'
      );
      
      res.json({
        success: true,
        approaches: correctApproaches,
        totalApproaches: session.approaches.length
      });

  } catch (error) {
    console.error('Stage 3 get data error:', error);
    res.status(500).json({
      error: 'Failed to get stage 3 data',
      details: error.message
    });
  }
};