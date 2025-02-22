import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import '@/styles/holographic.css';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function HolographicCard({ children, className = '' }: HolographicCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`holographic-card ${className}`}
    >
      <Card className="bg-black/50 backdrop-blur-md border-primary/20 p-6">
        {children}
      </Card>
    </motion.div>
  );
}
