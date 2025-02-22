import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';
import { useGameStore } from '@/lib/game/gameState';

interface TerminalProps {
  onCommand: (command: string) => void;
}

export default function Terminal({ onCommand }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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
        'SYSTEM: Scanning for unauthorized data streams...',
        'SYSTEM: Tracing source...',
        `SYSTEM: Recovery progress: ${progressPercentage}%`
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
      const response = `Executing: ${input}...`;
      setHistory(prev => [...prev, response]);
    }, 300);

    onCommand(input);
    setInput('');
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed w-96 bg-black/90 border border-primary/30 rounded-lg shadow-lg overflow-hidden backdrop-blur-sm
                  transition-all duration-300 ${isMinimized ? 'h-12' : 'h-64'}
                  ${isDragging ? 'shadow-lg shadow-primary/20' : ''}
                  after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-b after:from-primary/5 after:to-transparent after:pointer-events-none
                  before:content-[""] before:absolute before:inset-0 before:bg-[url('/scanline.png')] before:opacity-5 before:pointer-events-none before:animate-scanline`}
      style={{ 
        x: position.x, 
        y: position.y,
        boxShadow: `0 0 20px 0 rgba(var(--primary), 0.1)`,
        right: '1rem',
        bottom: '1rem'
      }}
    >
      <div className="flex items-center justify-between bg-primary/10 p-2 border-b border-primary/30 cursor-move">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-mono">System Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          {progressPercentage > 0 && (
            <div className="text-xs text-primary font-mono">
              Recovery: {progressPercentage}%
            </div>
          )}
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-primary/70 hover:text-primary transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
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
            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-primary/70 ml-1"
            />
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
        </>
      )}
    </motion.div>
  );
}