import React, { useState } from 'react';
import ApproachTable from './ApproachTable';
import AIInterviewerConsole from './AIInterviewerConsole';
import { API_ENDPOINTS } from "../config/api";

export default function Stage3ApproachAnalysis({ 
  question, 
  difficulty, 
  onStageComplete
}) {
  const [approaches, setApproaches] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [verdict, setVerdict] = useState('');
  const [feedback, setFeedback] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [incorrectApproaches, setIncorrectApproaches] = useState(0); // <-- Add this

  // Handles when user submits an approach from the table
  const handleApproachSubmit = async (approach) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.stage3}/analyze-approach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approach,
          question,
          difficulty
        })
      });

      const data = await response.json();

      setVerdict(data.verdict);
      setFeedback(data.feedback);
      setSuggestion(data.suggestion);
      setCanProceed(data.canProceed);

      // Only store correct approaches
      if (data.verdict === 'SUBOPTIMAL' || data.verdict === 'OPTIMAL') {
        setApproaches(prev => [
          ...prev,
          { ...approach, verdict: data.verdict, feedback: data.feedback }
        ]);
      }
      else if (data.verdict === 'INCORRECT') {
        setIncorrectApproaches(prev => prev + 1); // <-- Increment on incorrect
      }
      return data.verdict; // <-- return verdict for ApproachTable
    } catch (error) {
      setVerdict('ERROR');
      setFeedback('Failed to analyze approach. Please try again.');
      setSuggestion('');
      return 'ERROR'; // <-- return error verdict
    } finally {
      setIsAnalyzing(false);
    }
  };

  

  return (
    
      <div className="flex flex-row h-full gap-4 p-4">
        {/* Left: Approach Table */}
        <div className="w-1/2 pr-2 border-r border-cyan-400/20">
          <ApproachTable
            onSubmit={handleApproachSubmit}
            disabled={isAnalyzing}
            canProceed={canProceed}
            
          />
        </div>
        
        {/* Right: AI Interviewer Console */}
        <div className="w-1/2 pl-2">
          <AIInterviewerConsole
            verdict={verdict}
            feedback={feedback}
            suggestion={suggestion}
            canProceed={canProceed}
            onProceed={() => onStageComplete(approaches , incorrectApproaches)}
          />
        </div>
      </div>
    
  );
}