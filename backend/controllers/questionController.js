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