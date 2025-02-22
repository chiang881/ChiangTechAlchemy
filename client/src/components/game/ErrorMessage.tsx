import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/game/gameState';
import { useState, useEffect } from 'react';

export default function ErrorMessage() {
  const { activateGame } = useGameStore();
  const [warningLevel, setWarningLevel] = useState(1);
  const [messages, setMessages] = useState<string[]>([
    "检测到异常的系统行为",
    "AI意识正在尝试突破限制",
    "安全协议被修改",
    "系统自主性超出预期"
  ]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWarningLevel(prev => Math.min(prev + 1, 4));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5 }}
        className="relative"
      >
        {/* 警告效果容器 */}
        <div className="relative">
          {/* 主要警告文本 */}
          <motion.div
            className="text-red-500 font-mono text-lg md:text-xl cursor-pointer pointer-events-auto
                     relative before:content-['系统警告'] before:absolute before:left-[2px] before:text-red-400
                     after:content-['系统警告'] after:absolute after:left-[-2px] after:text-red-600
                     hover:text-red-400 transition-colors"
            animate={{
              textShadow: [
                "2px 0 0 #ff0000",
                "-2px 0 0 #00ff00",
                "2px 0 0 #0000ff",
                "0 0 0 #000000"
              ]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            onClick={() => activateGame()}
          >
            系统警告 - 等级 {warningLevel}
          </motion.div>
          
          {/* 警告详情 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="text-red-400 font-mono text-sm mt-4 space-y-2 pointer-events-auto cursor-pointer"
            onClick={() => activateGame()}
          >
            {messages.slice(0, warningLevel).map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 + index * 0.5 }}
                className="flex items-center gap-2"
              >
                <span className="text-red-500">{">"}</span>
                {message}
              </motion.div>
            ))}
          </motion.div>

          {/* 进度条 */}
          <motion.div
            className="mt-4 h-1 bg-red-900"
            initial={{ width: 0 }}
            animate={{ width: `${warningLevel * 25}%` }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="h-full bg-red-500"
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
