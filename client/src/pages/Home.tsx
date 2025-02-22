import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/canvas/ParticleBackground';
import HeroSection from '@/components/sections/HeroSection';
import TechManifesto from '@/components/sections/TechManifesto';
import Achievements from '@/components/sections/Achievements';
import Timeline from '@/components/sections/Timeline';
import TechStack from '@/components/sections/TechStack';
import ThinkingHub from '@/components/sections/ThinkingHub';
import HiddenGame from '@/components/game/HiddenGame';
import { useGameStore } from '@/lib/game/gameState';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function Home() {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const { activateGame, isGameActive } = useGameStore();

  useEffect(() => {
    document.body.style.overflow = isGameActive ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isGameActive]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.key];
      if (newSequence.length > KONAMI_CODE.length) {
        newSequence.shift();
      }
      setKeySequence(newSequence);

      if (newSequence.join(',') === KONAMI_CODE.join(',')) {
        activateGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence, activateGame]);

  return (
    <div className="relative min-h-screen bg-background">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <HeroSection />
        <TechManifesto />
        <Achievements />
        <Timeline />
        <TechStack />
        <ThinkingHub />
      </motion.div>

      <HiddenGame />
    </div>
  );
}