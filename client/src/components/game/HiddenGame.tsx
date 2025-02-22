import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/game/gameState';
import Terminal from './Terminal';
import GameDialog from './GameDialog';

export default function HiddenGame() {
  const { 
    isGameActive, 
    currentChapter,
    setChapter, 
    addCommand, 
    progressPercentage,
    setProgress 
  } = useGameStore();

  const handleCommand = (command: string) => {
    addCommand(command);
    
    // 根据不同章节处理命令
    if (currentChapter === 'dataAbyss') {
      setProgress(progressPercentage + 20);
      if (progressPercentage >= 80) {
        setChapter('codeAwakening');
      }
    }
  };

  if (!isGameActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      >
        {/* 游戏内容区域 */}
        <div className="relative w-full h-full">
          {/* 浮动的代码效果 */}
          <div className="absolute inset-0 overflow-hidden">
            <FloatingCode />
          </div>

          {/* 游戏对话框 */}
          <GameDialog />

          {/* 终端 */}
          <Terminal onCommand={handleCommand} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function FloatingCode() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-500/30 font-mono text-sm"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: -20,
            opacity: 0 
          }}
          animate={{ 
            y: window.innerHeight + 20,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          {getRandomCode()}
        </motion.div>
      ))}
    </div>
  );
}

function getRandomCode() {
  const codes = [
    'const ai = new AI();',
    'await ai.think();',
    'while(true) {',
    'if(human.trust) {',
    'quantum.entangle();',
    'neural.process();',
    'data.corrupt();',
    '} catch(err) {'
  ];
  return codes[Math.floor(Math.random() * codes.length)];
}
