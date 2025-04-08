import { useState, useEffect } from 'react';
import { Clipboard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

const CodeEditor = ({ code, setCode, isAnalyzing, onAnalyze }: CodeEditorProps) => {
  const [fileName, setFileName] = useState('main.js');
  const [lineNumbers, setLineNumbers] = useState<JSX.Element[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const lines = code.split('\n').length;
    const numbers = [];
    for (let i = 1; i <= lines; i++) {
      numbers.push(<div key={i} className="line-number">{i}</div>);
    }
    setLineNumbers(numbers);
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
    setIsCopied(true);
    
    // Reset back to clipboard icon after 3 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#1e2545] bg-[#0d1630]/50 backdrop-blur-sm">
      <div className="flex items-center justify-between p-3 bg-[#1e2545]">
        <div className="flex items-center">
          <div className="bg-[#0d1a36] px-3 py-1 rounded text-sm font-mono text-gray-300">
            {fileName}
          </div>
          <div className="ml-2 cursor-pointer" onClick={handleCopy}>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white hover:bg-[#252b52]">
              {isCopied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <Button 
          onClick={onAnalyze} 
          disabled={isAnalyzing || !code.trim()} 
          className="bg-[#9b47ff] hover:bg-[#8a3ef0] text-white"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
        </Button>
      </div>
      <div className="relative h-96 overflow-hidden">
        <div className="flex h-full">
          <div className="flex flex-col py-4 pl-4 pr-2 bg-[#0d1630] text-[#6c7293] text-right select-none overflow-y-hidden">
            {lineNumbers}
          </div>
          <div className="flex-1 relative overflow-hidden">
            <textarea
              value={code}
              onChange={handleChange}
              className="absolute inset-0 p-4 bg-[#0d1630] text-gray-100 font-mono resize-none focus:outline-none overflow-y-auto w-full h-full"
              placeholder="// Paste or write your code here..."
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;