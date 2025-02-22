import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/game/gameEngine';
import { generateMorseCode } from '@/lib/game/gameEngine';
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

  useEffect(() => {
    if (currentIndex >= fakeAchievements.length) {
      setTimeout(() => setStage('codeSpace'), 1000);
      return;
    }

    const glitchInterval = setInterval(() => {
      setIsGlitching(prev => !prev);
    }, 100);

    return () => clearInterval(glitchInterval);
  }, [currentIndex, setStage]);

  const handleRestore = (index: number) => {
    setCurrentIndex(index + 1);
    updateProgress((index + 1) / fakeAchievements.length * 100);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-primary">
          数据恢复进度: {Math.round((currentIndex / fakeAchievements.length) * 100)}%
        </h2>
      </motion.div>

      <div className="grid gap-6">
        {fakeAchievements.map((achievement, index) => (
          <HolographicCard 
            key={index}
            className={`cursor-pointer ${index < currentIndex ? 'opacity-50' : ''}`}
            onClick={() => index === currentIndex && handleRestore(index)}
          >
            <motion.div
              animate={{
                color: isGlitching && index === currentIndex ? '#ff0000' : '#ffffff',
              }}
              className="p-4"
            >
              <h3 className="text-xl font-bold mb-2">
                {index < currentIndex ? achievement.original : achievement.title}
              </h3>
              {index === currentIndex && (
                <div className="text-sm text-muted-foreground">
                  {isGlitching ? generateMorseCode(achievement.title) : achievement.title}
                </div>
              )}
            </motion.div>
          </HolographicCard>
        ))}
      </div>
    </div>
  );
}
