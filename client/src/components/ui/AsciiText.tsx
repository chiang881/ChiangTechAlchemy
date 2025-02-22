import { motion } from 'framer-motion';

interface AsciiTextProps {
  text: string;
  className?: string;
}

export default function AsciiText({ text, className = '' }: AsciiTextProps) {
  return (
    <motion.pre
      className={`font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.pre>
  );
}
