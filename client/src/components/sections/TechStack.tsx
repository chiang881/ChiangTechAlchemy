import { motion } from 'framer-motion';
import { SiRust, SiTypescript, SiSolidity, SiReact, SiTensorflow, SiKubernetes, SiAmazon, SiIpfs } from 'react-icons/si';
import HolographicCard from '@/components/ui/HolographicCard';
import { containerVariants, itemVariants } from '@/lib/animations';

const techCategories = [
  {
    title: "Languages",
    items: [
      { icon: <SiRust className="w-8 h-8" />, name: "Rust" },
      { icon: <SiTypescript className="w-8 h-8" />, name: "TypeScript" },
      { icon: <SiSolidity className="w-8 h-8" />, name: "Solidity" }
    ]
  },
  {
    title: "Frameworks",
    items: [
      { icon: <SiReact className="w-8 h-8" />, name: "React" },
      { icon: <SiTensorflow className="w-8 h-8" />, name: "TensorFlow" }
    ]
  },
  {
    title: "Infrastructure",
    items: [
      { icon: <SiKubernetes className="w-8 h-8" />, name: "Kubernetes" },
      { icon: <SiAmazon className="w-8 h-8" />, name: "AWS Lambda" },
      { icon: <SiIpfs className="w-8 h-8" />, name: "IPFS" }
    ]
  }
];

export default function TechStack() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-black/30">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl w-full"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Tech Stack Galaxy
          </h2>
          <p className="text-muted-foreground mt-4">
            Exploring the universe of technology
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              custom={categoryIndex}
            >
              <HolographicCard className="h-full">
                <h3 className="text-xl font-bold mb-6">{category.title}</h3>
                <div className="grid grid-cols-2 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      className="flex flex-col items-center gap-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-primary">
                        {item.icon}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}