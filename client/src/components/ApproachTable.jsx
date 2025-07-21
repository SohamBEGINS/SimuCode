import React, { useState } from 'react';

export default function ApproachTable({ onSubmit, disabled, canProceed }) {
  const [currentApproach, setCurrentApproach] = useState({
    description: '',
    timeComplexity: '',
    spaceComplexity: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [correctApproaches, setCorrectApproaches] = useState([]);

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
    const verdict = await onSubmit(currentApproach);
    setIsProcessing(false);

    if (verdict === 'INCORRECT') {
      setCurrentApproach({
        description: '',
        timeComplexity: '',
        spaceComplexity: ''
      });
      // Do not add to correctApproaches
    } else {
      setCorrectApproaches(prev => [
        ...prev,
        { ...currentApproach }
      ]);
      setCurrentApproach({
        description: '',
        timeComplexity: '',
        spaceComplexity: ''
      });
      // Input remains for next approach
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
        <span className="text-cyan-400 font-mono">$APPROACH TABLE</span>
      </div>
      <div className="terminal-section-content">
        {/* List correct approaches */}
        <div className="max-h-60 overflow-y-auto pr-1"></div>
        {correctApproaches.map((approach, idx) => (
          <div key={idx} className="mb-4 p-3 border border-cyan-400/20 rounded-md bg-black/20">
            <div className="font-mono text-cyan-300">Approach {idx + 1}:</div>
            <div className="text-cyan-100">{approach.description}</div>
            <div className="text-cyan-200 text-xs mt-1">
              Time: {approach.timeComplexity} | Space: {approach.spaceComplexity}
            </div>
          </div>
        ))}
        </div>

        {/* Input for new approach */}
        <form onSubmit={handleSubmit} className="new-approach-form relative">
        <div className="approach-header">
  <span className="text-cyan-400 font-mono">
    $ APPROACH:
  </span>
</div>
<div className={`approach-content bg-black/30 border border-cyan-400/20 rounded-md p-3 transition-colors duration-500`}>
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
      disabled={disabled || isProcessing}
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
        disabled={disabled || isProcessing}
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
        disabled={disabled || isProcessing}
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
      disabled={disabled || isProcessing}
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

       
      </div>
    
  );
}