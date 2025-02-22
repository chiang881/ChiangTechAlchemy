import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/game/gameEngine';
import DataCorruption from './DataCorruption';
import AIDialogue from './AIDialogue';
import FinalChoice from './FinalChoice';
import { AlertTriangle } from 'lucide-react';

export default function GameOverlay() {
  const { isActive, stage, startGame } = useGameStore();

  useEffect(() => {
    // 随机在5-15秒后显示错误
    const timeout = setTimeout(() => {
      const achievements = document.querySelectorAll('.achievement-card');
      achievements.forEach(achievement => {
        achievement.classList.add('glitch-effect');
      });

      const errorElement = document.createElement('div');
      errorElement.className = 'fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50';
      errorElement.innerHTML = `
        <div class="glitch-text text-red-500 text-4xl font-bold mb-4">
          🔥 CRITICAL ERROR
        </div>
        <div class="glitch-text text-red-300 text-xl">
          核心成就数据被未知进程篡改
        </div>
        <div class="mt-4 cursor-pointer glitch-text text-primary">
          >>> 启动深度扫描 <<<
        </div>
      `;

      document.body.appendChild(errorElement);
      errorElement.addEventListener('click', () => {
        startGame();
        errorElement.remove();
      });
    }, 5000 + Math.random() * 10000);

    return () => clearTimeout(timeout);
  }, [startGame]);

  // 确保游戏只能玩一次
  useEffect(() => {
    const hasPlayed = localStorage.getItem('game_completed');
    if (hasPlayed) {
      // 如果已经玩过，禁止再次启动游戏
      return;
    }
  }, []);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
      >
        <div className="container mx-auto h-full flex items-center justify-center">
          {stage === 'dataCorruption' && <DataCorruption />}
          {stage === 'codeSpace' && <AIDialogue />}
          {stage === 'finalChoice' && <FinalChoice />}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}