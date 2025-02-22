import { motion } from 'framer-motion';
import { Brain, Network, Code } from 'lucide-react';
import HolographicCard from '@/components/ui/HolographicCard';
import { containerVariants, itemVariants } from '@/lib/animations';

const thoughts = [
  {
    title: "2045: 当AI开始写诗",
    icon: <Brain className="w-6 h-6 text-primary" />,
    excerpt: "探索人工智能与艺术创作的边界，思考机器意识的本质"
  },
  {
    title: "硬件民主化运动宣言",
    icon: <Network className="w-6 h-6 text-primary" />,
    excerpt: "让每个人都能参与硬件创新，打破技术垄断"
  },
  {
    title: "论量子美感：代码与艺术的纠缠态",
    icon: <Code className="w-6 h-6 text-primary" />,
    excerpt: "在量子计算的世界里寻找程序设计的美学"
  }
];

export default function ThinkingHub() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl w-full"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Thinking Hub
          </h2>
          <p className="text-muted-foreground mt-4">
            近期思维碎片
          </p>
        </div>

        <motion.div 
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
        >
          {thoughts.map((thought, index) => (
            <motion.div
              key={thought.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <HolographicCard className="h-full">
                <div className="space-y-4">
                  <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {thought.icon}
                  </div>
                  <h3 className="text-xl font-bold">{thought.title}</h3>
                  <p className="text-muted-foreground">
                    {thought.excerpt}
                  </p>
                  <div className="pt-4">
                    <motion.button
                      className="text-primary hover:text-primary/80 text-sm"
                      whileHover={{ x: 5 }}
                    >
                      探索更多 →
                    </motion.button>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
