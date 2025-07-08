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


// Second AI agent for evaluating the AI's response context
async function evaluateAIResponseContext(aiResponse) {
  const prompt = `
You are an expert assistant. Analyze the following AI response to a user in a coding interview simulation:

AI RESPONSE: "${aiResponse}"

Determine if the response is positive and encouraging, indicating the user can proceed, or negative, indicating the user should retry. Respond ONLY with:
- "POSITIVE" if the response is supportive and the user can move to the next stage
- "NEGATIVE" if the response is critical or suggests the user should retry
No explanations, just POSITIVE or NEGATIVE.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 10
    });
    const result = response.choices[0].message.content.trim().toUpperCase();
    return result === "POSITIVE" ? "positive" : "negative";
  } catch (error) {
    console.error('AI context evaluation error:', error);
    throw new Error('AI context evaluation failed');
  }
}

// New chat-based scoring endpoint
exports.scoreUserInput = async (req, res) => {
  const { original, userInput, difficulty } = req.body;
  if (!original || !userInput || !difficulty) {
    return res.status(400).json({
      error: 'Missing required fields: original, userInput, difficulty'
    });
  }
  try {
    // User message
    const userMessage = userInput.trim();
    // AI response (simulate chat)
    const aiPrompt = `
    You are an expert coding interview evaluator. Your task is simple and is used to evaluate whether a user has understood the question or not:

ORIGINAL QUESTION: "${original}"
USER'S ANSWER: "${userInput}"

Determine if the user understood the question correctly. Consider:
1. Did they capture the main problem/requirement?
2. Did they understand the key constraints/conditions if any stated in the question?
3. Is their paraphrase accurate and complete?

Respond accordingly . If the user correctly understoods the question or the jist of the question , 
compliment him and if he fails tell him that he misses out something , but do not tell what he misses out. Try to respond in a minimum way possible , don't suggest any extra tips or feedbacks if he gets the question correct"`;


    const aiResponseObj = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: aiPrompt }],
      temperature: 0.5,
      max_tokens: 200
    });
    const aiResponse = aiResponseObj.choices[0].message.content.trim();
    // Second AI evaluates the AI's response context
    const evaluation = await evaluateAIResponseContext(aiResponse);
    // Build chat history
    const chat = [
      { sender: "user", message: userMessage },
      { sender: "ai", message: aiResponse }
    ];
    res.json({
      chat,
      evaluation // "positive" or "negative"
    });
  } catch (error) {
    console.error('Chat scoring error:', error);
    res.status(500).json({
      error: 'Failed to process chat and evaluation',
      details: error.message
    });
  }
};

// STAGE 2 

exports.clarify = async(req,res) =>{
  const { question, userMessage, history, difficulty, clarificationsUsed } = req.body;

  // Build the prompt for the LLM
  const prompt = `
You are a technical interviewer. The candidate is asking clarifying questions about the following coding problem:
"${question}"

Previous clarifications:
${history.map(h => `${h.sender === 'user' ? 'Candidate' : 'Interviewer'}: ${h.message}`).join('\n')}

Candidate's new question: "${userMessage}"

Respond as a coding interviewer. Sometimes, push back with "What do you think?" or answer ambiguously to encourage deeper thinking. Otherwise, answer helpfully.
`;

  try {
    // Directly call the LLM API (e.g., OpenAI)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 10
    });

    const aiMessage = response.choices[0].message.content.trim();
    res.json({ aiMessage });
  } catch (error) {
    console.error('LLM API error:', error.response?.data || error.message);
    res.status(500).json({ aiMessage: "Sorry, there was an error generating the response." });
  }

}