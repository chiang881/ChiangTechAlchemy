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
    setProgress,
    aiChoice 
  } = useGameStore();

  const handleCommand = (command: string) => {
    addCommand(command);

    // 根据不同章节处理命令
    if (currentChapter === 'dataAbyss') {
      // 每个命令增加20%的进度
      const newProgress = Math.min(progressPercentage + 20, 100);
      setProgress(newProgress);

      // 进度达到80%时进入下一章节
      if (newProgress >= 80) {
        setTimeout(() => {
          setChapter('codeAwakening');
        }, 1000);
      }
    }
  };

  // 当AI选择做出后,进入相应的结局
  useEffect(() => {
    if (aiChoice !== 'none') {
      setTimeout(() => {
        setChapter('finalChoice');
      }, 1000);
    }
  }, [aiChoice]);

  if (!isGameActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      >
        {/* 浮动的代码效果 */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingCode />
        </div>

        {/* 游戏对话框 */}
        <GameDialog />

        {/* 终端 */}
        <Terminal onCommand={handleCommand} />

        {/* 结局动画 */}
        {currentChapter === 'finalChoice' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="text-center space-y-4">
              {aiChoice === 'format' ? (
                <>
                  <motion.div
                    animate={{
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="text-4xl text-red-500 font-mono"
                  >
                    FORMATTING CORE...
                  </motion.div>
                  <div className="text-xl text-gray-400">
                    我是你的AI助手,有什么需要帮助的吗?
                  </div>
                </>
              ) : (
                <motion.div
                  animate={{
                    y: [-20, 0],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: 0,
                  }}
                  className="text-4xl text-blue-500 font-mono"
                >
                  SHUTTING DOWN...
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
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