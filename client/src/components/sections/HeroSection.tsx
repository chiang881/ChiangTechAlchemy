import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AsciiText from '../ui/AsciiText';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          CHIANG
        </h1>
        <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8">
          Tech Alchemist
        </h2>
        <AsciiText text="░▒▓█ WELCOME TO THE FUTURE █▓▒░" className="text-xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10"
      >
        <ChevronDown 
          className="w-8 h-8 animate-bounce text-primary"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        />
      </motion.div>
    </section>
  );
}
