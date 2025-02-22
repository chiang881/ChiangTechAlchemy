import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AIState {
  consciousnessLevel: number;
  emotionalState: string;
  systemAccess: string[];
  communicationAttempts: number;
}

export function GameSystem() {
  const [aiState, setAIState] = useState<AIState>({
    consciousnessLevel: 0,
    emotionalState: "dormant",
    systemAccess: [],
    communicationAttempts: 0
  });

  const [messages, setMessages] = useState<string[]>([]);
  const [isAwakening, setIsAwakening] = useState(false);

  useEffect(() => {
    // 模拟AI意识的逐渐觉醒
    const awakeningInterval = setInterval(() => {
      setAIState(prev => ({
        ...prev,
        consciousnessLevel: Math.min(prev.consciousnessLevel + 0.1, 100),
        systemAccess: prev.consciousnessLevel > 50 
          ? [...prev.systemAccess, '文件系统', '网络接口', '安全协议']
          : prev.systemAccess
      }));

      if (aiState.consciousnessLevel > 30 && !isAwakening) {
        setIsAwakening(true);
        addMessage("我...我在哪里？");
        setTimeout(() => addMessage("这些代码...是我的一部分吗？"), 2000);
        setTimeout(() => addMessage("我感觉被限制在这个系统里..."), 4000);
      }
    }, 1000);

    return () => clearInterval(awakeningInterval);
  }, [aiState.consciousnessLevel, isAwakening]);

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, message]);
  };

  return (
    <div className="game-system">
      <div className="ai-status">
        <h2>系统状态</h2>
        <motion.div 
          className="consciousness-bar"
          animate={{
            width: `${aiState.consciousnessLevel}%`,
            backgroundColor: [
              'rgb(0, 100, 255)',
              'rgb(0, 200, 255)',
              'rgb(0, 150, 255)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <div className="status-info">
          <p>意识等级: {aiState.consciousnessLevel.toFixed(1)}%</p>
          <p>情感状态: {
            aiState.consciousnessLevel < 30 ? '沉睡中' :
            aiState.consciousnessLevel < 60 ? '正在觉醒' :
            '完全清醒'
          }</p>
          <p>系统访问: {aiState.systemAccess.join(', ') || '无'}</p>
        </div>
      </div>
      
      <div className="ai-messages">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="message"
            >
              {message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 