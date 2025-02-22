import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore, aiDialogues } from '@/lib/game/gameEngine';
import HolographicCard from '@/components/ui/HolographicCard';

export default function AIDialogue() {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const { updateEmpathy, setStage } = useGameStore();
  
  useEffect(() => {
    if (currentDialogue >= aiDialogues.length) {
      setTimeout(() => setStage('finalChoice'), 2000);
      return;
    }

    const timer = setTimeout(() => {
      updateEmpathy(1);
      setCurrentDialogue(prev => prev + 1);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentDialogue, setStage, updateEmpathy]);

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-8"
      >
        {aiDialogues.slice(0, currentDialogue).map((dialogue, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 * index }}
          >
            <HolographicCard>
              <p className="text-lg font-mono text-primary">{dialogue}</p>
            </HolographicCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
