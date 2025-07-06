export const stageStorage = {
  // Store stage result
  storeStageResult: (stageData) => {
    const results = JSON.parse(localStorage.getItem('stageResults') || '[]');
    results.push(stageData);
    localStorage.setItem('stageResults', JSON.stringify(results));
  },

  // Get all stage results
  getAllStageResults: () => {
    return JSON.parse(localStorage.getItem('stageResults') || '[]');
  },

  // Get specific stage result
  getStageResult: (stageNumber) => {
    const results = JSON.parse(localStorage.getItem('stageResults') || '[]');
    return results.find(result => result.stage === stageNumber);
  },

  // Clear all results
  clearResults: () => {
    localStorage.removeItem('stageResults');
  }
};
