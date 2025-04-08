import { useState } from 'react';
import { Info, AlertTriangle, CheckCircle, MessageCircle, Code } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Suggestion {
  line: number;
  message: string;
  severity: string;
  ruleId: string;
}

interface TimeComplexity {
  current: string;
  improvement: {
    suggestion: string;
    improvedCode: string;
    improvedComplexity: string;
  };
}

interface AnalysisResultsProps {
  suggestions: Suggestion[];
  optimizations: string[];
  issues: string[];
  timeComplexity: TimeComplexity;
}

const AnalysisResults = ({ suggestions, optimizations, issues, timeComplexity }: AnalysisResultsProps) => {
  const [activeTab, setActiveTab] = useState('issues');

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <MessageCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'highlight-error';
      case 'warning':
        return 'highlight-warning';
      case 'info':
        return 'highlight-info';
      default:
        return '';
    }
  };

  // Format the code with syntax highlighting
  const formatCode = (code: string) => {
    // Remove any placeholder text
    if (code.includes("Could not extract improved code") || 
        code.includes("No code provided") ||
        code.includes("Static analysis cannot generate")) {
      return (
        <div className="flex items-center justify-center p-6 text-gray-400">
          <Code className="h-5 w-5 mr-2" />
          <span>No code improvements available</span>
        </div>
      );
    }
    
    // Return formatted code
    return (
      <pre className="text-xs text-code-foreground font-mono whitespace-pre-wrap overflow-auto">
        {code}
      </pre>
    );
  };

  const issueCount = suggestions.length;
  const optimizationCount = optimizations.length;

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-black/50 backdrop-blur-sm">
      <Tabs defaultValue="issues" value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        <TabsList className="w-full justify-start bg-secondary border-b border-border rounded-none p-0 h-auto">
          <TabsTrigger value="issues" className="py-3 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Issues <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-primary rounded-full">{issueCount}</span>
          </TabsTrigger>
          <TabsTrigger value="optimizations" className="py-3 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary">
            AI Optimizations <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-primary rounded-full">{optimizationCount}</span>
          </TabsTrigger>
          <TabsTrigger value="complexity" className="py-3 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Time Complexity
          </TabsTrigger>
        </TabsList>
        
        <div className="h-96 overflow-hidden">
          <TabsContent value="issues" className="h-full m-0 p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4 p-1">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg bg-secondary/50 ${getSeverityClass(suggestion.severity)}`}
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {getSeverityIcon(suggestion.severity)}
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-semibold text-gray-300">Line {suggestion.line}</span>
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300">{suggestion.ruleId}</span>
                          </div>
                          <p className="text-sm text-gray-200">{suggestion.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <CheckCircle className="mx-auto h-10 w-10 text-green-500 mb-3" />
                    <p className="text-lg font-medium text-gray-300">No issues found</p>
                    <p className="text-sm text-gray-400 mt-1">Your code looks good!</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="optimizations" className="h-full m-0 p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4 p-1">
                {optimizations.length > 0 ? (
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h3 className="text-base font-medium mb-4 text-blue-400 flex items-center">
                      <Info className="h-5 w-5 mr-2" />
                      AI Generated Suggestions
                    </h3>
                    <ul className="space-y-3">
                      {optimizations.map((opt, index) => (
                        <li key={index} className="pl-4 border-l-2 border-blue-500/50">
                          <p className="text-sm text-gray-200">{opt}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <MessageCircle className="mx-auto h-10 w-10 text-blue-500 mb-3" />
                    <p className="text-lg font-medium text-gray-300">No optimization suggestions</p>
                    <p className="text-sm text-gray-400 mt-1">AI couldn't generate optimization tips for this code</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="complexity" className="h-full m-0 p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4 p-1">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <h3 className="text-base font-medium mb-2 text-purple-400">Current Time Complexity</h3>
                  <p className="text-sm text-gray-200 mb-6">{timeComplexity.current}</p>
                  
                  <h3 className="text-base font-medium mb-2 text-green-400">Improvement Suggestion</h3>
                  <p className="text-sm text-gray-200 mb-4">{timeComplexity.improvement.suggestion}</p>
                  
                  <div className="bg-code rounded-lg p-3 mb-4">
                    {formatCode(timeComplexity.improvement.improvedCode)}
                  </div>
                  
                  <h3 className="text-base font-medium mb-2 text-blue-400">Improved Complexity</h3>
                  <p className="text-sm text-gray-200">{timeComplexity.improvement.improvedComplexity}</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AnalysisResults;