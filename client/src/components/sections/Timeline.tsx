import { motion } from 'framer-motion';
import { CalendarDays, Rocket, Code, Trophy } from 'lucide-react';
import HolographicCard from '@/components/ui/HolographicCard';
import { containerVariants, itemVariants } from '@/lib/animations';

const timelineEvents = [
  {
    year: "2025",
    title: "创立OrionTech",
    icon: <Rocket className="w-6 h-6 text-primary" />,
    details: [
      "开发脑机接口开发套件",
      "入选YC W25 Top10"
    ]
  },
  {
    year: "2024",
    title: "MIT访问学者",
    icon: <CalendarDays className="w-6 h-6 text-primary" />,
    details: [
      "主讲《量子计算与艺术》",
      "合作研发光子芯片"
    ]
  },
  {
    year: "2023",
    title: "黑客马拉松冠军",
    icon: <Trophy className="w-6 h-6 text-primary" />,
    details: [
      "24小时构建AI安全系统",
      "击败78支国际团队"
    ]
  }
];

export default function Timeline() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Journey Through Time
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              variants={itemVariants}
              className="mb-12 md:mb-24 relative"
            >
              <div className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full" />
                
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <HolographicCard>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 justify-start">
                        {event.icon}
                        <span className="text-2xl font-bold">{event.year}</span>
                      </div>
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <ul className="space-y-2">
                        {event.details.map((detail, i) => (
                          <li key={i} className="text-muted-foreground">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </HolographicCard>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
