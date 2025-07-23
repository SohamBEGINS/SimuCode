// API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://simu-code.vercel.app'  // Your Vercel backend URL
  : 'http://localhost:5000';        // Local development

export const API_ENDPOINTS = {
  questions: `${API_BASE_URL}/api/questions`,
  stage3: `${API_BASE_URL}/api/stage3`,
  stage4: `${API_BASE_URL}/api/stage4`,
  interviewSummary: `${API_BASE_URL}/api/interview-summary`,
};

export default API_BASE_URL;