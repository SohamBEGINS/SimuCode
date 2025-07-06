const Question = require('../models/Question');
const axios = require('axios');

// ElevenLabs TTS function
async function textToSpeech(text) {
  try {
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', // Default voice ID
      {
        text: text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      },
      {
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY
        },
        responseType: 'arraybuffer'
      }
    );
    
    // Convert to base64 for frontend
    const audioBuffer = Buffer.from(response.data);
    const base64Audio = audioBuffer.toString('base64');
    
    return {
      audio: base64Audio,
      format: 'audio/mpeg'
    };
  } catch (error) {
    console.error('ElevenLabs TTS error:', error.response?.data || error.message);
    throw new Error('Failed to generate speech');
  }
}

// getRandomQuestion logic
exports.getRandomQuestion = async (req, res) => {
  const { difficulty } = req.query;
  if (!difficulty) return res.status(400).json({ error: 'Difficulty is required' });

  try {
    const questions = await Question.find({ difficulty });
    if (!questions.length) return res.status(404).json({ error: 'No questions found' });

    const question = questions[Math.floor(Math.random() * questions.length)];
    
    // Generate TTS audio
    const ttsResult = await textToSpeech(question.question);
    
    res.json({ 
      question: question.question,
      audio: ttsResult.audio,
      format: ttsResult.format
    });
  } catch (error) {
    console.error('Error in getRandomQuestion:', error);
    res.status(500).json({ error: 'Failed to fetch question or generate speech' });
  }
};

// semantic similarity logic

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

//AI AGENT FOR SCORING 
async function evaluateWithAI(originalQuestion , userInput)
{
  const prompt = `
  You are an expert coding interview evaluator. Your task is simple and is used to evaluate whether a user has understood the question or not:

ORIGINAL QUESTION: "${originalQuestion}"
USER'S ANSWER: "${userInput}"

Determine if the user understood the question correctly. Consider:
1. Did they capture the main problem/requirement?
2. Did they understand the key constraints/conditions if any stated in the question?
3. Is their paraphrase accurate and complete?

Respond ONLY with:
- "PASS" if they understood the question correctly
- "FAIL" if they misunderstood or missed key elements

No explanations, no scores, just PASS or FAIL.
`


try{
  const response = await openai.chat.completions.create(
    {
      model:"gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1, // Low temperature for consistent results
      max_tokens: 10
    }
  );

  
  const result = response.choices[0].message.content.trim().toUpperCase();
  return result === "PASS";
}
catch(error){
  console.error('AI evaluation error:', error);
    throw new Error('AI evaluation failed');
}
}

//scoring endpoint 
exports.scoreUserInput = async (req, res) => {
  const { original, userInput, difficulty } = req.body;
  
  if (!original || !userInput || !difficulty) {
    return res.status(400).json({ 
      error: 'Missing required fields: original, userInput, difficulty' 
    });
  }

  try {
    // Basic validation
    const trimmedInput = userInput.trim();
    
    // AI evaluation
    const passed = await evaluateWithAI(original, trimmedInput, difficulty);
    
    // Store stage data for later use
    const stageData = {
      stage: 1,
      originalQuestion: original,
      userInput: trimmedInput,
      difficulty,
      passed,
      timestamp: new Date().toISOString(),
      feedback: passed 
        ? "You understood the question correctly!"
        : "You need to listen more carefully and understand the question better."
    };

    console.log(`Stage 1 AI Result: ${passed ? 'PASS' : 'FAIL'} for ${difficulty} difficulty`);

    res.json({
      passed,
      feedback: stageData.feedback,
      stageData // This will be stored for summary stage
    });

  } catch (error) {
    console.error('Scoring error:', error);
    res.status(500).json({ 
      error: 'Failed to evaluate your answer',
      details: error.message 
    });
  }
};