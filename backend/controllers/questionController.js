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

async function calculateSemanticSimilarity(text1,text2)
{
  try{
    const[embedding1,embedding2] = await Promise.all([
      openai.embeddings.create({
        model:"text-embedding-ada-002",
        input:text1,
      }),
      openai.embeddings.create({
        model:"text-embedding-ada-002",
        input:text2,
      }),

    ]);
    const vector1 = embedding1.data[0].embedding;
    const vector2 = embedding2.data[0].embedding;

     const similarity = cosineSimilarity(vector1,vector2);
     return similarity;

    }
    catch(error)
    {
      console.log('OpenAI api error :' , error);
      throw new Error('Failed to calculate similarity');
    }
}

//cosine similarity function
function cosineSimilarity(vecA,vecB)
{
  const dotProduct = vecA.reduce((sum,a,idx)=>sum+a*vecB[idx],0);
  const normA = Math.sqrt(vecA.reduce((sum,a,idx)=>sum+a*a,0));
  const normB = Math.sqrt(vecB.reduce((sum,b,idx)=>sum+b*b,0));
  return dotProduct/(normA*normB) ;
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
    // Calculate semantic similarity
    const similarity = await calculateSemanticSimilarity(original, userInput);
    const score = Math.round(similarity * 100); // Convert to percentage

    // Determine threshold based on difficulty
    const thresholds = {
      easy: 80,
      medium: 70,
      hard: 60
    };
    
    const threshold = thresholds[difficulty];
    const passed = score >= threshold;

    console.log(`Scoring result: ${score}% (threshold: ${threshold}%, passed: ${passed})`);

    res.json({
      score,
      threshold,
      passed,
      feedback: passed 
        ? "Great job! You understood the question well."
        : `Try again. You need ${threshold}% accuracy. Current score: ${score}%`
    });

  } catch (error) {
    console.error('Scoring error:', error);
    res.status(500).json({ 
      error: 'Failed to score user input',
      details: error.message 
    });
  }
};