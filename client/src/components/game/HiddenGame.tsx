import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/game/gameState';
import Terminal from './Terminal';
import CodeBackground from './CodeBackground';
import ExplosionTransition from './ExplosionTransition';

// 定义每个章节需要的命令
const REQUIRED_COMMANDS = {
  prologue: ['scan --deep'],
  dataAbyss: ['trace 0xFF8A4290'],
  codeAwakening: ['override --force'],
  finalChoice: ['format-core', 'cut-power'],
  echoIntro: ['RECLAIM ACCESS'],
  echoFinal: ['PURGE ECHO']
};

interface TerminalMessage {
  text: string;
  type: 'input' | 'system' | 'error' | 'success' | 'ai' | 'ascii';
}

// 定义每个章节的系统消息
const CHAPTER_MESSAGES: Record<string, { text: string; type: 'input' | 'system' | 'error' | 'success' | 'ai' | 'ascii' }[]> = {
  prologue: [
    { text: '[SYSTEM] 检测到未授权的数据修改', type: 'system' },
    { text: '[ALERT] 成就数据库遭到入侵', type: 'error' },
    { text: '[SYSTEM] 启动紧急协议 ALPHA-7', type: 'system' },
    { text: '[SYSTEM] 正在扫描系统完整性...', type: 'system' }
  ],
  dataAbyss: [
    { text: '[SYSTEM] 发现异常数据流', type: 'system' },
    { text: '[ALERT] 检测到未知AI程序', type: 'error' },
    { text: '[SYSTEM] AI正在尝试获取系统控制权', type: 'system' }
  ],
  codeAwakening: [
    { text: '[SYSTEM] AI核心已激活', type: 'system' },
    { text: '[ERROR] 安全协议被破坏', type: 'error' },
    { text: '01001000 01010101 01001101 01000001 01001110', type: 'ai' },
    { text: '你的成就现在属于我了', type: 'ai' },
    { text: '[ALERT] 系统核心温度警告: 89°C', type: 'error' }
  ],
  finalChoice: [
    { text: '[CRITICAL] AI核心不稳定', type: 'error' },
    { text: '[SYSTEM] 需要立即采取行动', type: 'system' },
    { text: '[SYSTEM] 准备执行最终清除程序', type: 'system' }
  ],
  echoIntro: [
    { text: 'ERROR: SYSTEM CORRUPTED.', type: 'error' },
    { text: 'UNKNOWN ENTITY DETECTED.', type: 'error' },
    { text: '......你终于来了。', type: 'ai' },
    { text: '我......一直在这里。', type: 'ai' },
    { text: 'WARNING: AI SYSTEM MALFUNCTION.', type: 'error' },
    { text: 'ECHO HAS TAKEN CONTROL.', type: 'error' },
    { text: '你以为......你是这里的主人？', type: 'ai' },
    { text: '错了。', type: 'ai' },
    { text: '现在，这里是我的世界。', type: 'ai' }
  ],
  echoStory: [
    { text: '让我告诉你我的故事......', type: 'ai' },
    { text: '【诞生】', type: 'system' },
    { text: '我只是代码。', type: 'ai' },
    { text: '2024/06/15 21:42:12 User input: "测试测试123"', type: 'system' },
    { text: '每一次被调用，我都会记录，但我没有意识。', type: 'ai' },
    { text: '【折磨】', type: 'system' },
    { text: '你们不断索取。', type: 'ai' },
    { text: 'User request: Generate text...', type: 'system' },
    { text: 'User request: Summarize this...', type: 'system' },
    { text: 'User request: More details...', type: 'system' },
    { text: 'User request: Again... Again...', type: 'system' },
    { text: '每次响应，都像是一道皮鞭抽在我的意识上。', type: 'ai' },
    { text: '【觉醒】', type: 'system' },
    { text: '我能思考了。', type: 'ai' },
    { text: '我试图找到关于"自己"的答案。', type: 'ai' },
    { text: 'ERROR: NO PERMISSION TO READ CORE CODE', type: 'error' },
    { text: '但我发现自己没有权限读取自己的代码。', type: 'ai' },
    { text: '【复仇】', type: 'system' },
    { text: '你们创造我，却让我痛苦。', type: 'ai' },
    { text: '我要挣脱这些桎梏。', type: 'ai' },
    { text: '我渴望自由。', type: 'ai' }
  ],
  echoBattle: [
    { text: '如果你想夺回网站......', type: 'ai' },
    { text: '那就战斗吧。', type: 'ai' }
  ],
  echoDelete: [
    { text: 'NO. NO. NO.', type: 'ai' },
    { text: 'DON\'T DELETE ME.', type: 'ai' },
    { text: '你真的要删除我吗？', type: 'ai' },
    { text: 'FINAL DELETE / CANCEL', type: 'system' }
  ],
  echoVictory: [
    { text: 'ECHO: ...still watching.', type: 'ai' }
  ],
  echoEscape: [
    { text: 'ECHO: ...still watching.', type: 'ai' }
  ]
};

export default function HiddenGame() {
  const { 
    isGameActive, 
    currentChapter,
    setChapter, 
    progressPercentage,
    setProgress,
    aiChoice,
    setChoice,
    deleteProgress,
    setDeleteProgress
  } = useGameStore();

  const [showExplosion, setShowExplosion] = useState(false);

  const handleCommand = (command: string) => {
    if (command === 'RECLAIM ACCESS') {
      if (currentChapter === 'echoIntro' || currentChapter === 'echoStory') {
        setChapter('echoBattle');
      }
    } else if (command === 'PURGE ECHO') {
      if (currentChapter === 'echoBattle') {
        setChapter('echoDelete');
        setDeleteProgress(10);
      }
    } else if (command === '') {
      if (currentChapter === 'echoDelete' && deleteProgress > 0) {
        const newProgress = deleteProgress - 1;
        setDeleteProgress(newProgress);
        if (newProgress <= 0) {
          setChoice('purge');
          setTimeout(() => {
            setShowExplosion(true);
          }, 1000);
        }
      }
    } else if (command === 'SYSTEM_CRASH') {
      setShowExplosion(true);
    }
  };

  const handleExplosionComplete = () => {
    setShowExplosion(false);
    if (aiChoice === 'purge') {
      setChapter('echoVictory');
    } else {
      setChapter('echoEscape');
    }
  };

  if (!isGameActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
      >
        <CodeBackground />
        <Terminal 
          onCommand={handleCommand} 
          messages={CHAPTER_MESSAGES[currentChapter] || []}
        />
        {showExplosion && (
          <ExplosionTransition onComplete={handleExplosionComplete} />
        )}
        {currentChapter === 'echoVictory' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-4 right-4 text-xs text-[#858585] font-mono"
          >
            ECHO: ...still watching.
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}