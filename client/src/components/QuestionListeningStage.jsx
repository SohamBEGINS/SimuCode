import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function QuestionListeningStage({ difficulty, onComplete, onBack }) {
  const [question, setQuestion] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  // Fetch question and generate TTS when component mounts
  useEffect(() => {
    fetchQuestion();
  }, [difficulty]);

  const fetchQuestion = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:5000/api/questions?difficulty=${difficulty}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch question');
      }
      
      setQuestion(data.question);
      
      // Convert base64 audio to blob and create audio URL
      if (data.audio) {
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))],
          { type: data.format }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudio(audioUrl);
      }
    } catch (err) {
      console.error('Error fetching question:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleSubmit = () => {
    if (userInput.trim()) {
      // For now, just pass the user input to parent
      // Later we'll add semantic similarity scoring
      onComplete({
        originalQuestion: question,
        userInput: userInput.trim(),
        difficulty
      });
    }
  };

  const handleRetry = () => {
    setUserInput("");
    setError(null);
    fetchQuestion();
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-12 w-12 text-cyan-400 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
        <p className="text-cyan-300 text-lg">Loading your question...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-2xl mb-4">⚠️</div>
        <p className="text-red-300 text-lg mb-6">{error}</p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={handleRetry}
            className="bg-red-600 hover:bg-red-700"
          >
            Try Again
          </Button>
          <Button 
            onClick={onBack}
            variant="outline"
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h2 className={cn(
          "text-2xl font-bold text-cyan-400 mb-2",
          "drop-shadow-lg font-mono"
        )}>
          $ Stage 1: Listen & Type
        </h2>
        <p className="text-cyan-300/70 text-base font-mono">
          Listen to the question carefully, then type what you heard
        </p>
      </div>

      {/* Audio Controls */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-cyan-200 text-lg font-mono">
           Listen to the question:
        </div>
        
        <div className="flex gap-4 items-center">
          <Button
            onClick={playAudio}
            disabled={!audio || isPlaying}
            className={cn(
              "px-6 py-3 font-mono",
              "bg-gradient-to-r from-cyan-600 to-blue-600",
              "hover:from-cyan-500 hover:to-blue-500",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isPlaying ? "Playing..." : "▶️ Play Question"}
          </Button>
          
          <Button
      onClick={playAudio}
      disabled={!audio || isPlaying}
      variant="outline"
      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-mono"
    >
      🔄 Replay
    </Button>
  </div>
        
        {/* Hidden audio element */}
        {audio && (
          <audio
            ref={audioRef}
            src={audio}
            onEnded={handleAudioEnded}
            onError={() => setIsPlaying(false)}
          />
        )}
      </div>

      {/* User Input */}
      <div className="w-full max-w-2xl">
        <label className="block text-cyan-300 text-lg font-mono mb-3">
          Type what you heard:
        </label>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type the question as you heard it..."
          className={cn(
            "w-full h-32 p-4 rounded-lg font-mono text-base",
            "bg-black/50 border-2 border-cyan-400/30",
            "text-cyan-100 placeholder-cyan-300/50",
            "focus:border-cyan-400 focus:outline-none",
            "resize-none"
          )}
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button
          onClick={handleSubmit}
          disabled={!userInput.trim()}
          className={cn(
            "px-8 py-3 text-lg font-bold font-mono",
            "bg-gradient-to-r from-green-600 to-emerald-600",
            "hover:from-green-500 hover:to-emerald-500",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          Submit Answer
        </Button>
        
        
      </div>

      {/* Instructions */}
      <div className="text-center text-cyan-200/70 text-sm font-mono max-w-md">
        💡 Tip: Listen carefully and type the question in your own words. 
        Don't worry about exact wording - focus on understanding the problem.
      </div>
    </div>
  );
} 