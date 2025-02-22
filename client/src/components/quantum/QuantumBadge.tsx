import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom } from 'lucide-react';
import { initEmergencySimulation } from '@/lib/quantum';

export default function QuantumBadge() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    initEmergencySimulation();
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-primary/20 
                     flex items-center justify-center cursor-pointer"
          animate={{
            boxShadow: isHovered 
              ? "0 0 20px rgba(66, 153, 225, 0.5)" 
              : "0 0 10px rgba(66, 153, 225, 0.2)"
          }}
        >
          <Atom className="w-6 h-6 text-primary" />
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                         whitespace-nowrap bg-black/70 text-primary px-3 py-1 rounded-md
                         text-sm backdrop-blur-md"
            >
              危机协议激活器
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
