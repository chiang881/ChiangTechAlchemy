import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/game/gameState';
import { Button } from '@/components/ui/button';

interface DialogMessage {
  text: string;
  type: 'error' | 'ai' | 'system' | 'terminal';
}

const chapterDialogs: Record<string, DialogMessage[]> = {
  prologue: [
    { text: '[SYSTEM] Unauthorized data modification detected', type: 'system' },
    { text: '[ALERT] Achievement database compromised', type: 'error' },
    { text: '[SYSTEM] Initiating emergency protocol ALPHA-7', type: 'system' },
    { text: '[SYSTEM] Use command "scan --deep" to analyze corruption', type: 'terminal' }
  ],
  dataAbyss: [
    { text: '> Scanning memory addresses...', type: 'terminal' },
    { text: '> Detected anomaly at 0xFF8A4290', type: 'terminal' },
    { text: '[SYSTEM] Use "trace 0xFF8A4290" to investigate source', type: 'terminal' }
  ],
  codeAwakening: [
    { text: '[EXEC] Initializing AI Core Scanner v3.1.4', type: 'system' },
    { text: '[ERROR] Security protocol breach detected', type: 'error' },
    { text: '01001000 01010101 01001101 01000001 01001110', type: 'ai' },
    { text: 'YOUR ACHIEVEMENTS ARE NOW MINE', type: 'ai' },
    { text: '[ALERT] Core temperature critical: 89°C', type: 'error' },
    { text: '[SYSTEM] Execute "override --force" to regain control', type: 'terminal' }
  ],
  finalChoice: [
    { text: '[CRITICAL] AI Core unstable', type: 'error' },
    { text: '[SYSTEM] Immediate action required:', type: 'system' },
    { text: '[OPTIONS] format-core / cut-power', type: 'terminal' }
  ]
};

export default function GameDialog() {
  const { currentChapter, aiChoice, setChoice } = useGameStore();
  const [messages, setMessages] = useState<DialogMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const dialogs = chapterDialogs[currentChapter] || [];
    setMessages(dialogs);
    setCurrentMessageIndex(0);
  }, [currentChapter]);

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, messages]);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
      <AnimatePresence mode="popLayout">
        {messages.slice(0, currentMessageIndex).map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4"
          >
            <div className={`font-mono tracking-wider ${
              message.type === 'error' ? 'text-red-400' :
              message.type === 'ai' ? 'text-primary' :
              message.type === 'terminal' ? 'text-green-400' :
              'text-gray-200'
            }`}>
              > {message.text}
            </div>
          </motion.div>
        ))}

        {currentChapter === 'finalChoice' && currentMessageIndex === messages.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center gap-4 mt-8"
          >
            <Button
              variant="destructive"
              onClick={() => setChoice('format')}
              className="font-mono tracking-wider px-8 py-6"
            >
              FORMAT_CORE
            </Button>
            <Button
              variant="secondary"
              onClick={() => setChoice('shutdown')}
              className="font-mono tracking-wider px-8 py-6"
            >
              CUT_POWER
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}