
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Analyze code function that connects to our backend
export const analyzeCode = async (code: string) => {
  try {
    console.log('Sending code for analysis...');
    const response = await axios.post(`${API_BASE_URL}/code-review`, { code });
    console.log('Analysis response received', response.data);
    return response.data;
  } catch (error) {
    console.error('Error analyzing code:', error);
    throw error;
  }
};

// Function to join a code review session room 
export const joinCodeReviewRoom = async (roomId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/code-review/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error joining code review room:', error);
    throw error;
  }
};

// Mock analysis for testing without backend
export const mockAnalyzeCode = async (code: string) => {
  // Simulate API call latency
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    suggestions: [
      {
        line: 3,
        message: "Callback nesting detected. Consider using Promises or async/await for better readability.",
        severity: "warning",
        ruleId: "excessive-nesting"
      },
      {
        line: 5,
        message: "Console statement found. Remove console logs in production code.",
        severity: "info",
        ruleId: "no-console"
      }
    ],
    optimizations: [
      "Replace nested callbacks with Promises or async/await for better readability.",
      "Add proper error handling with try/catch blocks.",
      "Consider using more descriptive variable names for improved code maintenance."
    ],
    issues: [
      "Callback hell pattern detected - code will be difficult to maintain as complexity grows.",
      "Missing error handling for asynchronous operations.",
      "Debug logs present in code that may go to production."
    ],
    timeComplexity: {
      current: "O(n) - Linear time complexity",
      improvement: {
        suggestion: "Current implementation is already optimal for this simple operation.",
        improvedCode: "// Code is already optimal in terms of time complexity",
        improvedComplexity: "O(n) - No improvement available for this operation"
      }
    }
  };
};
