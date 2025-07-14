import React, { useState } from 'react';

export default function ApproachTable({ onSubmit, disabled, canProceed }) {
  const [currentApproach, setCurrentApproach] = useState({
    description: '',
    timeComplexity: '',
    spaceComplexity: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const complexityOptions = [
    'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)', 'O(n!)'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !currentApproach.description.trim() ||
      !currentApproach.timeComplexity ||
      !currentApproach.spaceComplexity
    ) {
      alert('Please fill in all fields');
      return;
    }
    setIsProcessing(true);
    const verdict = await onSubmit(currentApproach); // onSubmit should return verdict string
    if (verdict === 'OPTIMAL' || verdict === 'SUBOPTIMAL') {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setCurrentApproach({ description: '', timeComplexity: '', spaceComplexity: '' });
        setIsProcessing(false);
      }, 1000);
    } else {
      setCurrentApproach({ description: '', timeComplexity: '', spaceComplexity: '' });
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentApproach(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="terminal-section">
      <div className="terminal-section-header">
        <span className="text-cyan-400 font-mono">APPROACH TABLE</span>
      </div>
      <div className="terminal-section-content">
        <form onSubmit={handleSubmit} className="new-approach-form relative">
          <div className={`approach-header ${success ? 'bg-green-700/30' : ''}`}>
            <span className="text-cyan-400 font-mono">
              APPROACH:
            </span>
          </div>
          <div className={`approach-content bg-black/30 border border-cyan-400/20 rounded-md p-3 transition-colors duration-500 ${success ? 'bg-green-900/40 border-green-400' : ''}`}>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1 text-cyan-300">
                Description:
              </label>
              <textarea
                className="terminal-textarea w-full text-cyan-100 focus:outline-none focus:ring-0"
                rows="3"
                value={currentApproach.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your approach to solve this problem..."
                disabled={disabled || isProcessing || success}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-cyan-300">
                  Time Complexity:
                </label>
                <select
                  className="terminal-select w-full text-cyan-100 bg-black/70 border border-cyan-400/30 focus:border-cyan-400 focus:ring-cyan-400 rounded-md"
                  value={currentApproach.timeComplexity}
                  onChange={(e) => handleInputChange('timeComplexity', e.target.value)}
                  disabled={disabled || isProcessing || success}
                >
                  <option value="">Select complexity...</option>
                  {complexityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-cyan-300">
                  Space Complexity:
                </label>
                <select
                  className="terminal-select w-full text-cyan-100 bg-black/70 border border-cyan-400/30 focus:border-cyan-400 focus:ring-cyan-400 rounded-md"
                  value={currentApproach.spaceComplexity}
                  onChange={(e) => handleInputChange('spaceComplexity', e.target.value)}
                  disabled={disabled || isProcessing || success}
                >
                  <option value="">Select complexity...</option>
                  {complexityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-3 flex justify-center relative">
              <button
                type="submit"
                className="px-4 py-1 bg-transparent border border-cyan-400 text-cyan-200 rounded-md font-mono text-base hover:bg-cyan-900 hover:text-white transition shadow-none"
                disabled={disabled || isProcessing || success}
              >
                SUBMIT APPROACH
              </button>
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-md animate-pulse z-10">
                  <span className="text-cyan-300 font-mono animate-bounce">Processing...</span>
                </div>
              )}
            </div>
          </div>
        </form>
        {canProceed && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-1 bg-green-700 border border-green-400 text-green-100 rounded-md font-mono text-base hover:bg-green-800 hover:text-white transition shadow-none"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Proceed to Coding
            </button>
          </div>
        )}
      </div>
    </div>
  );
}