import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import EchoTerminal from '../components/EchoTerminal';
import styled from 'styled-components';

const WhiteFlash = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 9998;
`;

const ExplosionEffect = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at center, white 0%, transparent 70%);
  z-index: 9997;
`;

// 定义状态接口
interface EchoState {
  stage: 'intro' | 'story' | 'battle' | 'ending';
  storyPhase: number;
  messages: string[];
  ending: 'A' | 'B' | 'C' | null;
}

const EchoStory: React.FC = () => {
  const [location] = useLocation();
  const [showTerminal, setShowTerminal] = useState(false);
  const [showWhiteFlash, setShowWhiteFlash] = useState(true);
  const [showExplosion, setShowExplosion] = useState(false);
  const isFromOldStory = location.includes('from=old');

  useEffect(() => {
    // 从 localStorage 恢复状态
    const savedState = localStorage.getItem('echo_story_state');
    if (savedState) {
      const state = JSON.parse(savedState) as EchoState;
      // 将状态传递给 EchoTerminal
      window.dispatchEvent(new CustomEvent('echo_restore_state', { detail: state }));
    }
  }, []);

  useEffect(() => {
    if (isFromOldStory) {
      // 从老剧情来的转场效果
      setTimeout(() => {
        setShowExplosion(true);
        
        setTimeout(() => {
          setShowWhiteFlash(false);
          setShowTerminal(true);
        }, 1500);
      }, 1000);
    } else {
      // 直接访问的转场效果
      setShowWhiteFlash(false);
      setShowTerminal(true);
    }
  }, [isFromOldStory]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#000' }}>
      <AnimatePresence>
        {showWhiteFlash && (
          <WhiteFlash
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.8, 1, 0.5, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, times: [0, 0.2, 0.4, 0.6, 0.8] }}
          />
        )}
        
        {showExplosion && (
          <ExplosionEffect
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1.5, 2],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 1.5,
              times: [0, 0.3, 1],
              ease: "easeOut"
            }}
          />
        )}

        {showTerminal && <EchoTerminal />}
      </AnimatePresence>
    </div>
  );
};

export default EchoStory; 