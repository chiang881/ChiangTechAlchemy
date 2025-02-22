import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/game/gameState';

export default function ErrorMessage() {
  const { activateGame } = useGameStore();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5 }}
        className="relative"
      >
        {/* Glitch effect container */}
        <div className="relative">
          {/* Error text with glitch effect */}
          <motion.div
            className="text-red-500 font-mono text-lg md:text-xl cursor-pointer pointer-events-auto
                     relative before:content-['CRITICAL_ERROR'] before:absolute before:left-[2px] before:text-red-400
                     after:content-['CRITICAL_ERROR'] after:absolute after:left-[-2px] after:text-red-600
                     hover:text-red-400 transition-colors"
            animate={{
              textShadow: [
                "2px 0 0 #ff0000",
                "-2px 0 0 #00ff00",
                "2px 0 0 #0000ff",
                "0 0 0 #000000"
              ]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            onClick={() => activateGame()}
          >
            CRITICAL ERROR
          </motion.div>
          
          {/* Additional error details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            className="text-red-400 font-mono text-sm mt-2 pointer-events-auto cursor-pointer"
            onClick={() => activateGame()}
          >
            核心成就数据被未知进程篡改
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
