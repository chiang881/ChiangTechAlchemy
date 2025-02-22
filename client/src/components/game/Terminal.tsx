import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import { useGameStore } from '@/lib/game/gameState';

interface TerminalProps {
  onCommand: (command: string) => void;
}

export default function Terminal({ onCommand }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { currentChapter, progressPercentage } = useGameStore();

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Add system messages based on current chapter
  useEffect(() => {
    if (currentChapter === 'dataAbyss') {
      const systemMessages = [
        'SYSTEM: 检测到异常数据流...',
        'SYSTEM: 正在追踪源头...',
        `SYSTEM: 修复进度: ${progressPercentage}%`
      ];
      setHistory(prev => [...prev, ...systemMessages]);
    }
  }, [currentChapter, progressPercentage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const formattedInput = `> ${input}`;
    setHistory(prev => [...prev, formattedInput]);

    // Add simulated response
    setTimeout(() => {
      const response = `正在执行: ${input}...`;
      setHistory(prev => [...prev, response]);
    }, 300);

    onCommand(input);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 w-96 h-64 bg-black/90 border border-primary/30 rounded-lg shadow-lg overflow-hidden backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 bg-primary/10 p-2 border-b border-primary/30">
        <TerminalIcon className="w-4 h-4 text-primary" />
        <span className="text-sm text-primary">Terminal</span>
        {progressPercentage > 0 && (
          <div className="ml-auto text-xs text-primary">
            修复进度: {progressPercentage}%
          </div>
        )}
      </div>

      <div 
        ref={terminalRef}
        className="h-44 overflow-y-auto p-2 font-mono text-sm"
      >
        <AnimatePresence mode="popLayout">
          {history.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`mb-1 ${
                line.startsWith('SYSTEM:') ? 'text-yellow-400' :
                line.startsWith('>') ? 'text-green-400' :
                'text-blue-400'
              }`}
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="p-2 border-t border-primary/30">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-transparent border-none outline-none text-green-400 font-mono text-sm"
          placeholder="输入命令..."
          autoFocus
        />
      </form>
    </motion.div>
  );
}