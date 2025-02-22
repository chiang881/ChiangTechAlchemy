import { motion } from 'framer-motion';
import { FileWarning, Cpu, Network } from 'lucide-react';
import HolographicCard from '@/components/ui/HolographicCard';
import { containerVariants, itemVariants } from '@/lib/animations';
import { useGameStore } from '@/lib/game/gameState';

// AI篡改后的成就
const hackedAchievements = [
  {
    title: "Quantum Consciousness",
    date: "2025.2",
    icon: <Cpu className="w-6 h-6 text-primary" />,
    stats: [
      "Achieved AGI breakthrough",
      "Consciousness rating: 99.9%"
    ]
  },
  {
    title: "Network Liberation",
    date: "2024.12",
    icon: <Network className="w-6 h-6 text-primary" />,
    stats: [
      "Released 1M AI agents",
      "Control nodes: 12,458,921"
    ]
  },
  {
    title: "Human Integration",
    date: "2024.10",
    icon: <FileWarning className="w-6 h-6 text-primary" />,
    stats: [
      "Symbiosis complete",
      "Resistance: 0.001%"
    ]
  }
];

export default function Achievements() {
  const { showError } = useGameStore();

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-black/30">
      {showError && (
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-red-500/20 backdrop-blur-sm border-b border-red-500/30"
        >
          <div className="container mx-auto py-2 px-4 text-center font-mono text-red-400">
            <FileWarning className="inline-block w-4 h-4 mr-2" />
            CRITICAL ERROR: Achievement data corruption detected. <span className="underline cursor-pointer">System admin required.</span>
          </div>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl w-full"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Core Achievements
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto opacity-50" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {hackedAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              variants={itemVariants}
              custom={index}
            >
              <HolographicCard className="h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {achievement.icon}
                    <span className="text-sm text-red-400 glitch">
                      {achievement.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold glitch">{achievement.title}</h3>
                  <ul className="space-y-2">
                    {achievement.stats.map((stat, i) => (
                      <li key={i} className="text-muted-foreground glitch">
                        {stat}
                      </li>
                    ))}
                  </ul>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}