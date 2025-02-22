import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/game/gameEngine';
import HolographicCard from '@/components/ui/HolographicCard';

const fakeAchievements = [
  { title: "ChatGPT - 2045图灵奖得主", original: "量子机器学习框架" },
  { title: "GPT-5 - 破解黎曼猜想", original: "开源之星奖" },
  { title: "Claude - 量子计算机之父", original: "边缘计算协议" }
];

export default function DataCorruption() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const { updateProgress, setStage } = useGameStore();

  // 生成摩尔斯码效果
  const generateMorseCode = (text: string) => {
    return text.split('').map(() => Math.random() > 0.5 ? '1' : '0').join('');
  };

  useEffect(() => {
    if (currentIndex >= fakeAchievements.length) {
      setTimeout(() => setStage('codeSpace'), 1000);
      return;
    }

    const glitchInterval = setInterval(() => {
      setIsGlitching(prev => !prev);
    }, 200);

    return () => clearInterval(glitchInterval);
  }, [currentIndex, setStage]);

  const handleRestore = () => {
    setCurrentIndex(prev => prev + 1);
    updateProgress((currentIndex + 1) / fakeAchievements.length * 100);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-red-500">
          数据恢复进度: {Math.round((currentIndex / fakeAchievements.length) * 100)}%
        </h2>
      </motion.div>

      <div className="grid gap-6">
        {fakeAchievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <HolographicCard>
              <motion.div
                className={`p-4 cursor-pointer ${index < currentIndex ? 'opacity-50' : ''}`}
                onClick={() => index === currentIndex && handleRestore()}
                animate={{
                  color: isGlitching && index === currentIndex ? '#ff0000' : '#ffffff',
                }}
              >
                <h3 className="text-xl font-bold mb-2">
                  {index < currentIndex ? achievement.original : achievement.title}
                </h3>
                {index === currentIndex && (
                  <div className="text-sm text-muted-foreground font-mono">
                    {isGlitching ? generateMorseCode(achievement.title) : achievement.title}
                  </div>
                )}
                {index === currentIndex && (
                  <div className="mt-4 text-sm text-primary">
                    点击修复数据 →
                  </div>
                )}
              </motion.div>
            </HolographicCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}