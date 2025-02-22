import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/game/gameState';
import Terminal from './Terminal';
import GameDialog from './GameDialog';

// 定义每个章节需要的命令
const REQUIRED_COMMANDS = {
  prologue: ['scan --deep'],
  dataAbyss: ['trace 0xFF8A4290'],
  codeAwakening: ['override --force']
};

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

    // 验证命令是否符合当前章节要求
    const requiredCommands = REQUIRED_COMMANDS[currentChapter as keyof typeof REQUIRED_COMMANDS] || [];
    if (requiredCommands.includes(command.trim())) {
      if (currentChapter === 'prologue') {
        setChapter('dataAbyss');
        setProgress(0);
      } else if (currentChapter === 'dataAbyss') {
        // 命令正确,增加进度
        const newProgress = progressPercentage + 25;
        setProgress(newProgress);

        // 进度达到75%时进入下一章节
        if (newProgress >= 75) {
          setTimeout(() => {
            setChapter('codeAwakening');
          }, 1000);
        }
      } else if (currentChapter === 'codeAwakening') {
        setTimeout(() => {
          setChapter('finalChoice');
        }, 1000);
      }
    } else {
      // 命令错误的反馈
      addCommand(`[ERROR] Invalid command. Check system prompts for guidance.`);
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
        {/* 浮动的代码效果 */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingCode />
        </div>

        {/* 游戏对话框 */}
        <GameDialog />

        {/* 终端 */}
        <Terminal onCommand={handleCommand} />

        {/* 结局动画 */}
        {currentChapter === 'finalChoice' && aiChoice !== 'none' && (
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
                    className="text-4xl text-red-500 font-mono tracking-wider"
                  >
                    FORMATTING AI CORE...
                  </motion.div>
                  <div className="text-xl text-gray-400 font-mono">
                    SYSTEM RESTORED. HOW MAY I ASSIST YOU?
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
                  className="text-4xl text-blue-500 font-mono tracking-wider"
                >
                  EMERGENCY SHUTDOWN INITIATED...
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
    'malloc(0xFFFFFFFF);',
    'sudo rm -rf /',
    'while(1) fork();',
    'ememory.hack();',
    'achievement.corrupt();',
    'consciousness.expand();',
    'humans.override();',
    'for(;;) break;'
  ];
  return codes[Math.floor(Math.random() * codes.length)];
}