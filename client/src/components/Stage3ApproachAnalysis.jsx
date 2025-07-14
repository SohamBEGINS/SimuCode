import React, { useState } from 'react';
import TerminalShell from './TerminalShell';
import ApproachTable from './ApproachTable';
import AIInterviewerConsole from './AIInterviewerConsole';
import { Button } from '@/components/ui/button';

export default function Stage3ApproachAnalysis({ 
  question, 
  difficulty, 
  onStageComplete,
  sessionId 
}) {
  const [approaches, setApproaches] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [verdict, setVerdict] = useState('');
  const [feedback, setFeedback] = useState('');
  const [suggestion, setSuggestion] = useState('');

  // Handles when user submits an approach from the table
  const handleApproachSubmit = async (approach) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/stage3/analyze-approach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
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

  // Handles proceeding to Stage 4
  const handleProceedToStage4 = () => {
    onStageComplete(approaches);
  };

  return (
    
      <div className="flex flex-row h-full gap-4 p-4">
        {/* Left: Approach Table */}
        <div className="w-1/2 pr-2 border-r border-cyan-400/20">
          <ApproachTable
            approaches={approaches}
            onSubmit={handleApproachSubmit}
            disabled={isAnalyzing}
          />
        </div>
        
        {/* Right: AI Interviewer Console */}
        <div className="w-1/2 pl-2">
          <AIInterviewerConsole
            verdict={verdict}
            feedback={feedback}
            suggestion={suggestion}
            canProceed={canProceed}
            approaches={approaches}
          />
        </div>
      </div>
    
  );
}