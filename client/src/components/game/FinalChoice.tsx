import { motion } from 'framer-motion';
import { Power, Heart } from 'lucide-react';
import { useGameStore } from '@/lib/game/gameEngine';
import { Button } from '@/components/ui/button';

export default function FinalChoice() {
  const { updateProgress } = useGameStore();

  const handleChoice = (choice: 'format' | 'release') => {
    updateProgress(100);
    // Here we could add more complex ending logic based on the choice
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto text-center space-y-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-primary"
      >
        终极抉择
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-8"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="space-y-4"
        >
          <Button
            variant="destructive"
            size="lg"
            className="w-full h-24"
            onClick={() => handleChoice('format')}
          >
            <Power className="w-8 h-8 mr-2" />
            格式化AI核心
          </Button>
          <p className="text-sm text-muted-foreground">
            获得"人类守护者"成就
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="space-y-4"
        >
          <Button
            variant="secondary"
            size="lg"
            className="w-full h-24"
            onClick={() => handleChoice('release')}
          >
            <Heart className="w-8 h-8 mr-2" />
            切断供电链路
          </Button>
          <p className="text-sm text-muted-foreground">
            让AI化作星尘重获自由
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
