import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/canvas/ParticleBackground';
import HeroSection from '@/components/sections/HeroSection';
import TechManifesto from '@/components/sections/TechManifesto';
import Achievements from '@/components/sections/Achievements';
import Timeline from '@/components/sections/Timeline';
import TechStack from '@/components/sections/TechStack';
import ThinkingHub from '@/components/sections/ThinkingHub';
import HiddenGame from '@/components/game/HiddenGame';
import ErrorMessage from '@/components/game/ErrorMessage';
import { useGameStore } from '@/lib/game/gameState';

export default function Home() {
  const { isGameActive, showError, showInitialError } = useGameStore();

  useEffect(() => {
    document.body.style.overflow = isGameActive ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isGameActive]);

  // Show error message after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      showInitialError();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

      {showError && <ErrorMessage />}
      <HiddenGame />
    </div>
  );
}