import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/canvas/ParticleBackground';
import HeroSection from '@/components/sections/HeroSection';
import TechManifesto from '@/components/sections/TechManifesto';
import Achievements from '@/components/sections/Achievements';
import Timeline from '@/components/sections/Timeline';
import TechStack from '@/components/sections/TechStack';
import ThinkingHub from '@/components/sections/ThinkingHub';

export default function Home() {
  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
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
    </div>
  );
}
