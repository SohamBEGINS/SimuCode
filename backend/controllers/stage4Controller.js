
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeCodeWithAI({ code, approach, question, difficulty }) {
    const prompt = `
  You are an expert coding interviewer. Given the following:
  
  Question: ${question}
  Difficulty: ${difficulty}
  Approach: ${approach}
  Candidate's code:
  ${code}
  
  Evaluate the code for the given approach syntax errors and see if its correct given the question .
   If the code is correct, reply with: CORRECT. If not or incomplete, reply with: ERROR: <brief reason or edge case missed>.
   Try to give response in minimum words possible
  `;
  
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 400
      });
  
    const text = response.choices[0].message.content.trim();
    if (text.startsWith('CORRECT')) {
      return { status: 'correct' };
    } else if (text.startsWith('ERROR:')) {
      return { status: 'error', message: text.replace('ERROR:', '').trim() };
    } else {
      return { status: 'error', message: 'Unclear AI response.' };
    }
  }
  
  module.exports = { analyzeCodeWithAI };