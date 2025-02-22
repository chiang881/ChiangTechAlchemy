import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/game/gameEngine';
import DataCorruption from './DataCorruption';
import AIDialogue from './AIDialogue';
import FinalChoice from './FinalChoice';
import { Button } from '@/components/ui/button';

export default function GameOverlay() {
  const { isActive, stage, startGame } = useGameStore();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '`' && e.ctrlKey) {
        startGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [startGame]);

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
          {stage === 'intro' && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-4"
            >
              <h1 className="text-4xl font-bold text-red-500">
                🔥 CRITICAL ERROR
              </h1>
              <p className="text-xl text-red-300">
                核心成就数据被未知进程篡改
              </p>
              <Button 
                variant="destructive"
                onClick={() => useGameStore.getState().setStage('dataCorruption')}
              >
                点击启动深度扫描
              </Button>
            </motion.div>
          )}

          {stage === 'dataCorruption' && <DataCorruption />}
          {stage === 'codeSpace' && <AIDialogue />}
          {stage === 'finalChoice' && <FinalChoice />}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
