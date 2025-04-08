import axios from 'axios';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// New function to detect syntax errors
const detectSyntaxErrors = (code) => {
  const errors = [];
  try {
    // Use Function constructor to check syntax without executing
    // This is safer than eval() but still catches syntax errors
    new Function(code);
  } catch (error) {
    // Parse the error message to extract line number and message
    const errorInfo = error.toString();
    let lineNumber = 1;
    let errorMessage = errorInfo;
    
    // Try to extract line number from error message
    const lineMatch = errorInfo.match(/line\s+(\d+)/i) || 
                      errorInfo.match(/at\s+line\s+(\d+)/);
    if (lineMatch && lineMatch[1]) {
      lineNumber = parseInt(lineMatch[1], 10);
    }
    
    // Try to extract cleaner error message
    const messageMatch = errorInfo.match(/SyntaxError:\s+(.+?)(?:\s+at|$)/);
    if (messageMatch && messageMatch[1]) {
      errorMessage = messageMatch[1];
    }
    
    errors.push({
      line: lineNumber,
      message: `Syntax error: ${errorMessage}`,
      severity: "error",
      ruleId: "syntax-error"
    });
  }
  return errors;
};

// Simple code analysis without ESLint dependency
const analyzeCodePatterns = (code) => {
  const suggestions = [];
  const lines = code.split('\n');
  
  // Check for callback nesting (callback hell)
  const indentationLevels = lines.map(line => {
    const match = line.match(/^\s*/);
    return match ? match[0].length : 0;
  });
  
  const maxIndentation = Math.max(...indentationLevels);
  if (maxIndentation > 8) {
    suggestions.push({
      line: indentationLevels.indexOf(maxIndentation) + 1,
      message: "Deep nesting detected. Consider using promises or async/await.",
      severity: "warning",
      ruleId: "excessive-nesting"
    });
  }
  
  // Check for console.log statements
  lines.forEach((line, index) => {
    if (line.includes('console.log')) {
      suggestions.push({
        line: index + 1,
        message: "Console statement found. Remember to remove debug logs in production.",
        severity: "info",
        ruleId: "no-console"
      });
    }
  });
  
  // Check for missing error handling in callbacks
  if (code.includes('callback') || code.includes('=>')) {
    if (!code.includes('catch') && !code.includes('error') && !code.includes('err')) {
      suggestions.push({
        line: 1,
        message: "No error handling detected in asynchronous code. Consider adding try/catch or error parameters.",
        severity: "warning",
        ruleId: "missing-error-handling"
      });
    }
  }
  
  // Check for variable naming
  const variableRegex = /\b(var|let|const)\s+([a-zA-Z0-9_]+)\b/g;
  let match;
  while ((match = variableRegex.exec(code)) !== null) {
    const varName = match[2];
    if (varName.length === 1 && varName !== 'i' && varName !== 'j' && varName !== 'k') {
      suggestions.push({
        line: getLineNumberFromIndex(code, match.index),
        message: `Short variable name '${varName}' detected. Consider using more descriptive names.`,
        severity: "info",
        ruleId: "descriptive-names"
      });
    }
  }
  
  // Check for common syntax mistakes with regex patterns
  // Missing semicolons in non-optional places
  lines.forEach((line, index) => {
    // Check for statements that should end with semicolons but don't
    if (line.trim() && 
        !line.trim().endsWith(';') && 
        !line.trim().endsWith('{') && 
        !line.trim().endsWith('}') && 
        !line.trim().endsWith(':') &&
        !line.trim().startsWith('//') && 
        !line.trim().startsWith('/*') &&
        !line.trim().startsWith('*') &&
        !line.trim().endsWith('*/') &&
        !line.trim().match(/^\s*if|for|while|switch|function|class|import|export/) &&
        !line.trim().match(/^\s*\/\//) &&
        !line.includes('=>') &&
        line.trim().length > 0) {
      
      // Check if the next line doesn't start with a chain operator
      const nextLine = lines[index + 1] ? lines[index + 1].trim() : '';
      if (!nextLine.startsWith('.') && !nextLine.startsWith('?') && !nextLine.startsWith('[')) {
        suggestions.push({
          line: index + 1,
          message: "Possible missing semicolon at end of statement.",
          severity: "warning",
          ruleId: "missing-semicolon"
        });
      }
    }
  });
  
  // Check for unbalanced brackets
  const brackets = {
    '{': '}',
    '[': ']',
    '(': ')'
  };
  
  const stack = [];
  let lineMapping = [];
  
  // Build line mapping for character positions
  let position = 0;
  lines.forEach((line, lineIndex) => {
    for (let i = 0; i < line.length; i++) {
      lineMapping[position] = lineIndex + 1;
      position++;
    }
    // Account for the newline character
    lineMapping[position] = lineIndex + 1;
    position++;
  });
  
  // Check for bracket balance
  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    if (brackets[char]) {
      // Opening bracket
      stack.push({char, position: i});
    } else if (Object.values(brackets).includes(char)) {
      // Closing bracket
      const lastBracket = stack.pop();
      if (!lastBracket || brackets[lastBracket.char] !== char) {
        const line = lineMapping[i] || 1;
        suggestions.push({
          line,
          message: `Unbalanced bracket: unexpected '${char}'`,
          severity: "error",
          ruleId: "unbalanced-brackets"
        });
      }
    }
  }
  
  // Check for unclosed brackets
  if (stack.length > 0) {
    stack.forEach(bracket => {
      const line = lineMapping[bracket.position] || 1;
      suggestions.push({
        line,
        message: `Unclosed bracket: '${bracket.char}' is not closed`,
        severity: "error",
        ruleId: "unclosed-brackets"
      });
    });
  }

  return suggestions;
};

// Helper function to get line number from character index
function getLineNumberFromIndex(text, index) {
  const lines = text.slice(0, index).split('\n');
  return lines.length;
}

// Get static code suggestions
const getCodeSuggestions = (code) => {
  // Static suggestions based on code patterns
  const suggestions = [];
  
  // Check for callback patterns
  if (code.includes('=>') && code.includes('=>', code.indexOf('=>') + 2)) {
    suggestions.push("Replace nested callbacks with Promises or async/await for better readability.");
    suggestions.push("Consider using Promise.all() for parallel operations.");
  }
  
  // Check for error handling
  if (!code.includes('try') || !code.includes('catch')) {
    suggestions.push("Add proper error handling with try/catch blocks or .catch() methods.");
  }
  
  // Check for console.log
  if (code.includes('console.log')) {
    suggestions.push("Replace console.log with proper logging that can be configured based on environment.");
  }
  
  // Check for missing semicolons (common in JavaScript)
  if (code.includes('\n') && !code.includes(';\n')) {
    suggestions.push("Consider adding semicolons at the end of statements for consistency.");
  }
  
  // Add some default suggestions if none were generated
  if (suggestions.length === 0) {
    suggestions.push("Ensure your code has proper documentation with JSDoc or similar comments.");
    suggestions.push("Consider writing unit tests for your functions.");
    suggestions.push("Review variable names for clarity and consistency.");
  }
  
  return suggestions;
};

// Improved function to extract code blocks from text
const extractCodeBlock = (text) => {
  // First try to find code blocks with proper markdown formatting
  const codeBlockMatch = text.match(/```(?:javascript|js)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch && codeBlockMatch[1]) {
    return codeBlockMatch[1];
  }
  
  // If no formatted code block, look for code-like content
  const lines = text.split('\n');
  const codeLines = [];
  let inCodeSection = false;
  
  for (const line of lines) {
    // Detect start of code sections based on common patterns
    if (!inCodeSection && 
        (line.includes('function') || 
         line.includes('=>') || 
         line.includes('const ') || 
         line.includes('let ') || 
         line.includes('class ') ||
         line.includes('import ') ||
         line.trim().startsWith('//'))) {
      inCodeSection = true;
    }
    
    if (inCodeSection) {
      // Stop collecting when we hit text that doesn't look like code
      if (line.trim() && 
          !line.includes('function') && 
          !line.includes('=>') && 
          !line.includes('const ') && 
          !line.includes('let ') && 
          !line.includes('var ') && 
          !line.includes('import ') && 
          !line.includes('return ') && 
          !line.includes('{') && 
          !line.includes('}') && 
          !line.trim().startsWith('//') && 
          !line.trim().startsWith('/*') && 
          !line.trim().startsWith('*') && 
          !line.trim().startsWith('*/') && 
          !line.trim().startsWith('if') && 
          !line.trim().startsWith('else') && 
          !line.trim().startsWith('for') && 
          !line.trim().startsWith('while') &&
          line.length > 30) { // Long lines without code markers are likely explanations
        inCodeSection = false;
      } else {
        codeLines.push(line);
      }
    }
  }
  
  // Only return if we found something substantial
  return codeLines.length > 2 ? codeLines.join('\n') : null;
};

// Use Gemini API for AI analysis
const getAISuggestions = async (code) => {
  try {
    // Only attempt API call if API key is present
    if (process.env.GEMINI_API_KEY) {
      console.log("Attempting to get AI suggestions from Google Gemini...");
      
      // Initialize the Generative AI with your API key
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      
      // Get the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const promptText = `
Review this code and respond with a valid JSON object containing these sections:
1. "syntaxErrors": An array of objects with {line, message} describing any syntax errors
2. "issues": An array of strings describing bugs, security risks, and code smells
3. "optimizations": An array of strings with code improvement suggestions
4. "timeComplexity": A string describing the current time complexity
5. "timeComplexityImprovements": An object with:
   - "suggestion": A string describing how to improve time complexity
   - "improvedCode": A code snippet (please provide complete, runnable code) showing the implementation
   - "improvedComplexity": A string describing the improved time complexity

IMPORTANT: 
- Put the code in the improvedCode section without any markdown formatting.
- Pay special attention to identifying syntax errors in the code.
- For syntax errors, include the line number and a clear error message.

Here's the code to analyze:

${code}
`;
      
      console.log("Generating content using the Gemini model...");
      // Generate content using the model
      const result = await model.generateContent(promptText);
      const response = await result.response;
      const generatedContent = response.text();
      
      // Process the response
      if (generatedContent) {
        try {
          // First try to extract JSON directly
          let jsonContent = generatedContent;
          
          // Check for JSON blocks and extract them
          const jsonBlockMatch = jsonContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
          if (jsonBlockMatch && jsonBlockMatch[1]) {
            jsonContent = jsonBlockMatch[1];
          }
          
          // Parse the JSON
          let analysisResults = JSON.parse(jsonContent);
          
          // Ensure proper structure
          return {
            syntaxErrors: analysisResults.syntaxErrors || [],
            issues: analysisResults.issues || [],
            optimizations: analysisResults.optimizations || [],
            timeComplexity: analysisResults.timeComplexity || "Time complexity analysis unavailable",
            timeComplexityImprovements: {
              suggestion: analysisResults.timeComplexityImprovements?.suggestion || "No specific improvements identified",
              improvedCode: analysisResults.timeComplexityImprovements?.improvedCode || "// No code provided",
              improvedComplexity: analysisResults.timeComplexityImprovements?.improvedComplexity || "Unknown"
            }
          };
        } catch (jsonError) {
          console.warn("JSON parsing failed, extracting content manually");
          
          // Extract information from text
          const syntaxErrors = [];
          const issues = [];
          const optimizations = [];
          let timeComplexity = "Time complexity analysis unavailable";
          let improvementSuggestion = "No specific improvements identified";
          let improvedComplexity = "Unknown";
          
          // Extract code block properly
          const extractedCode = extractCodeBlock(generatedContent);
          const improvedCode = extractedCode || "// No code provided";
          
          // Extract sections based on headers
          const sections = generatedContent.split(/#{1,3}\s+/);
          for (const section of sections) {
            const lowerSection = section.toLowerCase();
            if (lowerSection.includes('syntax') || lowerSection.includes('error')) {
              // Extract syntax errors
              const bulletPoints = section.split(/\n\s*[-*]\s+/).slice(1);
              bulletPoints.forEach(point => {
                const lineMatch = point.match(/line\s+(\d+)/i);
                if (lineMatch && lineMatch[1]) {
                  syntaxErrors.push({
                    line: parseInt(lineMatch[1], 10),
                    message: point.trim()
                  });
                } else {
                  syntaxErrors.push({
                    line: 1,
                    message: point.trim()
                  });
                }
              });
            } else if (lowerSection.includes('issue') || lowerSection.includes('bug') || lowerSection.includes('problem')) {
              // Extract bullet points
              const bulletPoints = section.split(/\n\s*[-*]\s+/).slice(1);
              issues.push(...bulletPoints.map(p => p.trim()).filter(p => p));
            } else if (lowerSection.includes('optim') || lowerSection.includes('improve')) {
              const bulletPoints = section.split(/\n\s*[-*]\s+/).slice(1);
              optimizations.push(...bulletPoints.map(p => p.trim()).filter(p => p));
            } else if (lowerSection.includes('time complex') || lowerSection.includes('complexity')) {
              const lines = section.split('\n');
              if (lines[0]) timeComplexity = lines[0].trim();
              
              // Try to find improvement suggestion
              const suggestionIdx = lines.findIndex(l => 
                l.toLowerCase().includes('suggest') || 
                l.toLowerCase().includes('improve')
              );
              
              if (suggestionIdx >= 0) {
                improvementSuggestion = lines[suggestionIdx].trim();
              }
              
              // Try to find improved complexity
              const improvedIdx = lines.findIndex(l => 
                l.toLowerCase().includes('improved') || 
                l.toLowerCase().includes('better')
              );
              
              if (improvedIdx >= 0) {
                improvedComplexity = lines[improvedIdx].trim();
              }
            }
          }
          
          // Fill in defaults if nothing was found
          if (syntaxErrors.length === 0) {
            syntaxErrors.push({
              line: 1,
              message: "No syntax errors detected by AI analysis"
            });
          }
          
          if (issues.length === 0) {
            issues.push("Code review could not identify specific issues");
          }
          
          if (optimizations.length === 0) {
            optimizations.push("Consider refactoring for better maintainability");
            optimizations.push("Review error handling patterns");
          }
          
          return {
            syntaxErrors,
            issues,
            optimizations,
            timeComplexity,
            timeComplexityImprovements: {
              suggestion: improvementSuggestion,
              improvedCode,
              improvedComplexity
            }
          };
        }
      }
    }
    
    // Fall back to static analysis if API key not available
    console.log("Using static analysis (no API key or API error)");
    const staticSuggestions = getCodeSuggestions(code);
    const syntaxErrors = detectSyntaxErrors(code);
    
    return {
      syntaxErrors,
      issues: staticSuggestions,
      optimizations: [
        "Consider refactoring for better maintainability",
        "Add more comprehensive error handling"
      ],
      timeComplexity: "Time complexity analysis requires AI assistance",
      timeComplexityImprovements: {
        suggestion: "Consider algorithmic improvements appropriate for your use case",
        improvedCode: "// Static analysis cannot generate improved code\n// Consider refactoring callbacks to async/await\n\nasync function improvedFunction() {\n  try {\n    const result = await asyncOperation();\n    return processResult(result);\n  } catch (error) {\n    handleError(error);\n  }\n}",
        improvedComplexity: "Depends on specific optimizations applied"
      }
    };
  } catch (err) {
    console.error('Error in AI analysis:', err.message);
    
    // Provide helpful fallback with actual code sample
    const staticSuggestions = getCodeSuggestions(code);
    const syntaxErrors = detectSyntaxErrors(code);
    
    return {
      syntaxErrors,
      issues: staticSuggestions,
      optimizations: [
        "Consider refactoring for better maintainability",
        "Review algorithms for performance improvements"
      ],
      timeComplexity: "Could not analyze time complexity (API error occurred)",
      timeComplexityImprovements: {
        suggestion: "Replace callback patterns with async/await",
        improvedCode: "// Example of improved pattern:\n\nasync function improvedFunction() {\n  try {\n    const result = await asyncOperation();\n    const processedData = await processData(result);\n    return processedData;\n  } catch (error) {\n    console.error('Operation failed:', error);\n    throw new Error('Processing failed: ' + error.message);\n  }\n}",
        improvedComplexity: "Similar time complexity but improved readability"
      }
    };
  }
};

export const analyzeCode = async (code) => {
  try {
    console.log("Starting code analysis...");
    
    // Simple pattern-based analysis (no ESLint)
    const lintResults = analyzeCodePatterns(code);
    
    // Detect syntax errors
    const syntaxErrors = detectSyntaxErrors(code);
    
    // Try AI suggestions but gracefully fall back
    const aiAnalysis = await getAISuggestions(code);
    
    // Combine syntax errors from both detection methods
    const allSyntaxErrors = [
      ...syntaxErrors,
      ...(aiAnalysis.syntaxErrors || [])
    ];
    
    // Remove duplicates by line and message
    const uniqueSyntaxErrors = [];
    const errorSet = new Set();
    
    allSyntaxErrors.forEach(error => {
      const key = `${error.line}-${error.message}`;
      if (!errorSet.has(key)) {
        errorSet.add(key);
        uniqueSyntaxErrors.push(error);
      }
    });
    
    // Convert syntax errors to the suggestion format
    const syntaxSuggestions = uniqueSyntaxErrors.map(error => ({
      line: error.line,
      message: error.message,
      severity: "error",
      ruleId: "syntax-error"
    }));
    
    // Combine all suggestions
    const allSuggestions = [...lintResults, ...syntaxSuggestions];
    
    console.log(`Analysis complete. Found ${lintResults.length} pattern-based issues and ${syntaxErrors.length} syntax errors.`);
    
    return {
      suggestions: allSuggestions,
      syntaxErrors: uniqueSyntaxErrors,
      optimizations: aiAnalysis.optimizations || [],
      issues: [
        ...(aiAnalysis.issues || []),
        ...(uniqueSyntaxErrors.length > 0 ? uniqueSyntaxErrors.map(err => `Syntax error at line ${err.line}: ${err.message}`) : [])
      ],
      timeComplexity: {
        current: aiAnalysis.timeComplexity || "Unknown",
        improvement: aiAnalysis.timeComplexityImprovements || {
          suggestion: "No specific improvements identified",
          improvedCode: "// No code provided",
          improvedComplexity: "Unknown"
        }
      }
    };
  } catch (error) {
    console.error("Error in analyzeCode:", error);
    
    // Still try to detect syntax errors even if other analysis fails
    const syntaxErrors = detectSyntaxErrors(code);
    
    // Return a minimal valid response with actual code sample
    return {
      suggestions: [
        { 
          line: 1, 
          message: "Simple code analysis detected potential issues.",
          severity: 'info',
          ruleId: 'general-review'
        },
        ...(syntaxErrors.map(err => ({
          line: err.line,
          message: err.message,
          severity: 'error',
          ruleId: 'syntax-error'
        })))
      ],
      syntaxErrors,
      optimizations: [
        "Consider using modern JavaScript features.",
        "Add proper error handling to your code.",
        "Review your code for readability and maintainability."
      ],
      issues: [
        "Static analysis was used due to an error in the analysis process.",
        ...(syntaxErrors.length > 0 ? syntaxErrors.map(err => `Syntax error at line ${err.line}: ${err.message}`) : [])
      ],
      timeComplexity: {
        current: "Could not analyze due to an error",
        improvement: {
          suggestion: "Use async/await pattern for better readability",
          improvedCode: "// Example of improvement:\n\nasync function getData() {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return processData(data);\n  } catch (error) {\n    console.error('Failed to fetch data:', error);\n    throw new Error('Data retrieval failed');\n  }\n}",
          improvedComplexity: "Similar time complexity but improved error handling"
        }
      }
    };
  }
};