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
  const { currentChapter } = useGameStore();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setHistory([...history, `> ${input}`]);
    onCommand(input);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 w-96 h-64 bg-black/90 border border-primary/30 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="flex items-center gap-2 bg-primary/10 p-2 border-b border-primary/30">
        <TerminalIcon className="w-4 h-4 text-primary" />
        <span className="text-sm text-primary">Terminal</span>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-44 overflow-y-auto p-2 font-mono text-sm text-green-400"
      >
        <AnimatePresence mode="popLayout">
          {history.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mb-1"
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
          placeholder="Enter command..."
          autoFocus
        />
      </form>
    </motion.div>
  );
}
