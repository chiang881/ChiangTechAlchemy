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
import { useGameStore } from '@/lib/game/gameState';

export default function Home() {
  const { isGameActive, showError, showInitialError, activateGame } = useGameStore();

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

      {/* Error Banner */}
      {showError && (
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-red-500/20 backdrop-blur-sm border-b border-red-500/30"
        >
          <div 
            className="container mx-auto py-2 px-4 text-center font-mono text-red-400 cursor-pointer"
            onClick={activateGame}
          >
            CRITICAL ERROR: Achievement database compromised. Click to initialize system recovery.
          </div>
        </motion.div>
      )}

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