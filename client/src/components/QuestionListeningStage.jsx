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
  const [scoring,setScoring] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false); // NEW: Audio loading state
  const [audioReady, setAudioReady] = useState(false); // NEW: Audio ready state
  const [scoreResult,setScoreResult] = useState(null);
  const [chat, setChat] = useState([]); // NEW: Chat history
  const [evaluation, setEvaluation] = useState(null); // NEW: Evaluation result
  // Add a ref to scroll chat to bottom
  const chatEndRef = useRef(null);

  // Fetch question and generate TTS when component mounts
  useEffect(() => {
    fetchQuestion();
  }, [difficulty]);

  // Debug state changes
  useEffect(() => {
    console.log('Audio states:', { audioReady, audioLoading, isPlaying, audio: !!audio });
  }, [audioReady, audioLoading, isPlaying, audio]);

    //  Cleanup audio URL on unmount
    useEffect(() => {
      return () => {
        if (audio) {
          URL.revokeObjectURL(audio);
        }
      };
    }, [audio]);  

  const fetchQuestion = async () => {
    setLoading(true);
    setError(null);
    setAudioReady(false); // Reset audio state
    
    try {
      const response = await fetch(`http://localhost:5000/api/questions?difficulty=${difficulty}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch question');
      }
      
      setQuestion(data.question);
      
      // Convert base64 audio to blob and create audio URL
      if (data.audio) {
        setAudioLoading(true);
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))],
          { type: data.format }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudio(audioUrl);

        try {
          // Preload audio
          await preloadAudio(audioUrl);
          setAudioReady(true);
          console.log('Audio ready set to true');
        } catch (error) {
          console.error('Audio preload failed:', error);
          setError('Failed to load audio. Please try again.');
        } finally {
          setAudioLoading(false);
          console.log('Audio loading set to false');
        }
      } else {
        setAudioLoading(false);
      }
    } catch (err) {
      console.error('Error fetching question:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // NEW: Preload audio function
  const preloadAudio = (audioUrl) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      
      audio.addEventListener('canplaythrough', () => {
        console.log('Audio preloaded successfully');
        resolve();
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Audio preload error:', e);
        reject(new Error('Audio preload failed'));
      });
      
      audio.addEventListener('loadeddata', () => {
        console.log('Audio data loaded');
      });
      
      audio.src = audioUrl;
      audio.load(); // Explicitly load the audio
      
      // Fallback timeout in case canplaythrough doesn't fire
      setTimeout(() => {
        console.log('Audio preload timeout fallback');
        resolve();
      }, 3000);
    });
  };


  // ENHANCED: Play audio with better error handling
  const playAudio = async () => {
    if (!audioRef.current || !audioReady) {
      console.log('Audio not ready');
      return;
    }

    try {
      setIsPlaying(true);
      
      // Reset audio to beginning
      audioRef.current.currentTime = 0;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        console.log('Audio started playing');
      }
    } catch (error) {
      console.error('Audio play error:', error);
      setIsPlaying(false);
      setError('Failed to play audio. Please try again.');
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleAudioError = (e) => {
    console.error('Audio element error:', e);
    setIsPlaying(false);
    setError('Audio playback error. Please try again.');
  };

  const handleAudioLoadStart = () => {
    console.log('Audio loading started');
  };

  const handleAudioCanPlay = () => {
    console.log('Audio can play');
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    setScoring(true);
    setEvaluation(null); // Reset evaluation
    // Add user message to chat
    setChat(prev => [...prev, { sender: "user", message: userInput.trim() }]);
    try {
      const response = await fetch('http://localhost:5000/api/questions/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original: question,
          userInput: userInput.trim(),
          difficulty
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Scoring failed');
      }
      // Update chat with AI response
      setChat(result.chat);
      setEvaluation(result.evaluation); // "positive" or "negative"
      setScoreResult(null); // Clear old result
      if (result.evaluation === "positive") {
        // User can proceed
        onComplete({
          chat: result.chat,
          evaluation: result.evaluation
        });
      } else {
        // User must retry
        setScoreResult({
          passed: false,
          feedback: "Please try again. The AI suggests you need to improve your answer."
        });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setScoring(false);
      setUserInput("");
    }
  };
  

  const handleRetry = () => {
    setUserInput("");
    setError(null);
    fetchQuestion();
  };

  // Add a ref to scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, scoring]);

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
        
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
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
            disabled={!audioReady || isPlaying || audioLoading}
            className={cn(
              "px-6 py-3 font-mono",
              "bg-gradient-to-r from-cyan-600 to-blue-600",
              "hover:from-cyan-500 hover:to-blue-500",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {audioLoading ? "Loading..." : isPlaying ? "Playing..." : "▶️ Play Question"}
          </Button>
          
          <Button
      onClick={playAudio}
      disabled={!audioReady || isPlaying || audioLoading}
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
            onError={handleAudioError}
            onLoadStart={handleAudioLoadStart}
            onCanPlay={handleAudioCanPlay}
            preload="auto"
          />
        )}
      </div>

      {/* Chat + Input Area */}
      <div className="w-full max-w-2xl flex-1 flex flex-col bg-black/80 rounded-xl border border-cyan-400/20 shadow-inner overflow-hidden" style={{ minHeight: 0 }}>
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2" style={{ minHeight: 0 }}>
          {chat.map((msg, idx) => (
            <div key={idx} className={
              msg.sender === "user"
                ? "self-end bg-green-900 text-green-200 px-4 py-2 rounded-2xl max-w-[70%] shadow-md"
                : "self-start bg-gray-800 text-cyan-200 px-4 py-2 rounded-2xl max-w-[70%] shadow-md"
            }>
              <span>{msg.message}</span>
            </div>
          ))}
          {scoring && (
            <div className="self-start text-cyan-400 italic animate-pulse">Interviewer is typing...</div>
          )}
          <div ref={chatEndRef} />
        </div>
        {/* Input Area */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-black/90 border-t border-cyan-400/10 px-4 py-3 flex gap-2 items-end"
        >
          <textarea
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            placeholder="Type your answer..."
            className={cn(
              "flex-1 min-h-[40px] max-h-32 resize-none rounded-lg font-mono text-base",
              "bg-black/60 border border-cyan-400/20 text-cyan-100 placeholder-cyan-300/50",
              "focus:border-cyan-400 focus:outline-none px-3 py-2"
            )}
            rows={1}
            disabled={scoring}
          />
          <Button
            type="submit"
            disabled={!userInput.trim() || scoring}
            className={cn(
              "px-6 py-2 text-lg font-bold font-mono",
              "bg-gradient-to-r from-green-600 to-emerald-600",
              "hover:from-green-500 hover:to-emerald-500",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {scoring ? "..." : "Send"}
          </Button>
        </form>
      </div>

      {/* Evaluation result */}
      {evaluation === "positive" && (
        <div className="mt-4 text-green-400 font-bold">Good job! You may proceed to the next stage.</div>
      )}
      {evaluation === "negative" && (
        <div className="mt-4 text-red-400 font-bold">Please try again. The Interviewer suggests you need to improve your answer.</div>
      )}

      {/* Instructions */}
      <div className="text-center text-cyan-200/70 text-sm font-mono max-w-md">
        💡 Tip: Listen carefully and type the question in your own words. 
        Don't worry about exact wording - focus on understanding the problem.
      </div>
    </div>
  );
} 