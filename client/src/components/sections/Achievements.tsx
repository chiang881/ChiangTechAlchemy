import { motion } from 'framer-motion';
import { Award, Star, Download } from 'lucide-react';
import HolographicCard from '@/components/ui/HolographicCard';
import { containerVariants, itemVariants } from '@/lib/animations';

const achievements = [
  {
    title: "量子机器学习框架",
    date: "2024 Q2",
    icon: <Star className="w-6 h-6 text-primary" />,
    stats: [
      "GitHub Stars: 2.4k",
      "被TensorFlow官方文档引用"
    ]
  },
  {
    title: "开源之星奖",
    date: "2023年度",
    icon: <Award className="w-6 h-6 text-primary" />,
    stats: [
      "维护12个热门库",
      "年下载量超5千万次"
    ]
  },
  {
    title: "边缘计算协议",
    date: "2022突破",
    icon: <Download className="w-6 h-6 text-primary" />,
    stats: [
      "降低延迟至7ms",
      "专利号: US2022-CHIANG-0xFE"
    ]
  }
];

export default function Achievements() {
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
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Core Achievements
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto opacity-50" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              variants={itemVariants}
              custom={index}
            >
              <HolographicCard className="h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {achievement.icon}
                    <span className="text-sm text-muted-foreground">
                      {achievement.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{achievement.title}</h3>
                  <ul className="space-y-2">
                    {achievement.stats.map((stat, i) => (
                      <li key={i} className="text-muted-foreground">
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
