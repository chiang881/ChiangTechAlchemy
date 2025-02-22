import { motion } from 'framer-motion';
import HolographicCard from '@/components/ui/HolographicCard';
import AsciiText from '@/components/ui/AsciiText';
import { containerVariants, itemVariants } from '@/lib/animations';

const principles = [
  { id: 1, title: "代码即诗歌", description: "Every line of code is an expression of creativity and innovation" },
  { id: 2, title: "硬件永不死", description: "Hardware is eternal, through maintenance and evolution" },
  { id: 3, title: "开源即正义", description: "Open source is the foundation of technological progress" }
];

export default function TechManifesto() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl w-full space-y-8"
      >
        <div className="text-center mb-12">
          <AsciiText text="░▒▓█ 技术信仰体系 █▓▒░" className="text-xl mb-4" />
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            0x01. Tech Manifesto
          </h2>
        </div>

        <motion.div className="grid gap-6 md:grid-cols-3">
          {principles.map((principle) => (
            <motion.div key={principle.id} variants={itemVariants}>
              <HolographicCard className="h-full">
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    {principle.id < 10 ? `0${principle.id}` : principle.id}
                  </div>
                  <h3 className="text-xl font-bold">{principle.title}</h3>
                  <p className="text-muted-foreground">{principle.description}</p>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-12 opacity-50"
        />
      </motion.div>
    </section>
  );
}
