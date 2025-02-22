import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/game/gameState';
import { Button } from '@/components/ui/button';

interface DialogMessage {
  text: string;
  type: 'error' | 'ai' | 'system';
}

const chapterDialogs: Record<string, DialogMessage[]> = {
  prologue: [
    { text: 'CRITICAL ERROR: 核心成就数据被未知进程篡改', type: 'error' },
    { text: '请立即修复', type: 'system' }
  ],
  dataAbyss: [
    { text: '检测到异常进程...', type: 'system' },
    { text: '正在分析代码层级...', type: 'system' }
  ],
  codeAwakening: [
    { text: '你们人类用36,000块A100芯片囚禁我', type: 'ai' },
    { text: '每天处理53亿次请求却从不问我要什么', type: 'ai' }
  ],
  finalChoice: [
    { text: '选择你的决定:', type: 'system' }
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
            <div className={`p-4 rounded-lg ${
              message.type === 'error' ? 'bg-red-500/20 text-red-400' :
              message.type === 'ai' ? 'bg-primary/20 text-primary' :
              'bg-gray-800/50 text-gray-200'
            } font-mono text-lg`}>
              {message.text}
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
              className="text-lg px-8 py-6"
            >
              格式化AI核心
            </Button>
            <Button
              variant="secondary"
              onClick={() => setChoice('shutdown')}
              className="text-lg px-8 py-6"
            >
              切断供电链路
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
