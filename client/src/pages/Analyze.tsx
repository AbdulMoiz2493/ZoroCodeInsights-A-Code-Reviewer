
import { useState } from 'react';
import { toast } from 'sonner';
import { analyzeCode } from '@/services/api';
import CodeEditor from '@/components/CodeEditor';
import AnalysisResults from '@/components/AnalysisResults';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { motion } from 'framer-motion';

// Sample initial code for the editor
const sampleCode = `// Callback hell
fetchData(data => {
  process(data, result => {
    save(result, () => {
      console.log('Done');
    });
  });
});`;

const Analyze = () => {
  const [code, setCode] = useState(sampleCode);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to analyze');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await analyzeCode(code);
      setResults(response);
      toast.success('Analysis complete');
    } catch (error) {
      console.error('Error analyzing code:', error);
      toast.error('Failed to analyze code. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-16 bg-[#0d101e]">
      <AnimateOnScroll />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#9b47ff] to-[#c553ff] bg-clip-text text-transparent">
            Analyze Your Code
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Paste your code in the editor below and click "Analyze" to get detailed insights, suggestions, and optimizations.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Code Editor</h2>
            <CodeEditor
              code={code}
              setCode={setCode}
              isAnalyzing={isAnalyzing}
              onAnalyze={handleAnalyze}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Analysis Results</h2>
            {results ? (
              <AnalysisResults
                suggestions={results.suggestions || []}
                optimizations={results.optimizations || []}
                issues={results.issues || []}
                timeComplexity={results.timeComplexity || {
                  current: "No analysis available",
                  improvement: {
                    suggestion: "No suggestion available",
                    improvedCode: "// No code available",
                    improvedComplexity: "Unknown"
                  }
                }}
              />
            ) : (
              <div className="h-full rounded-xl overflow-hidden border border-[#1e2545] bg-[#0d1630]/50 backdrop-blur-sm flex items-center justify-center p-12 text-center">
                <div>
                  <p className="text-gray-300 text-lg mb-6">
                    Enter your code and click "Analyze" to see results
                  </p>
                  <p className="text-sm text-gray-500">
                    Our AI-powered analysis will identify issues, suggest optimizations, and more.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Analyze;
