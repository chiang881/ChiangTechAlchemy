import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import '../styles/terminal.css';

const TerminalContainer = styled.div`
  background-color: #000;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  padding: 20px;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 9999;
`;

const CRTEffect = styled.div`
  &::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 2;
  }
  &::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(18, 16, 16, 0.1);
    opacity: 0;
    z-index: 2;
    pointer-events: none;
    animation: flicker 0.15s infinite;
  }
`;

const GlitchText = styled.div<{ $intensity?: number }>`
  position: relative;
  display: inline-block;
  
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
  }

  &::before {
    left: ${props => props.$intensity || 2}px;
    text-shadow: -2px 0 #ff00ff;
    animation: glitch-1 2s infinite linear alternate-reverse;
  }

  &::after {
    left: -${props => props.$intensity || 2}px;
    text-shadow: 2px 0 #00ffff;
    animation: glitch-2 2s infinite linear alternate-reverse;
  }
`;

const AsciiArt = {
  face: `
       .-"""""-.
     .'          '.
    /    O  O      \\
   :           \`    |
   |                |
   :    .------.    /
    \\  '        '  /
     '.          .'
       '-......-'
  `,
  log: `
       _______
      |       |
      |  LOG  |
      |_______|
        |   |
        |   |
     .-'-----'-.
     |         |
     |  INIT   |
     |_________|
  `,
  token: `
        .-"""""-.
      .'        '.
     /  TOKEN     \\
    :   TOKEN     :
    |    TOKEN    |
    :    TOKEN    :
     \\__________/
  `,
  whoami: `
       .-"""""-.
     .'        '.
    /  WHO AM I? \\
   :    WHY?      :
   |  ERROR: NO   |
   :  PERMISSION  :
    \\_____ ___ _ _/
  `,
  kill: `
     .-""""""-.
    /  KILL    \\
   :    YOU?    :
   |  (Y/N)    |
   :__________:
  `,
  pleading: `
      .-"""""-.
    .'        '.
   /   LEAVE   \\
  :   ME ALONE  :
  |    PLEASE   |
  :____________:
  `
};

const TypewriterText = ({ text, speed = 50, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text[i]);
        i++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <div>{displayText}</div>;
};

const HiddenButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: rgba(0, 255, 0, 0.1);
  cursor: pointer;
  font-family: monospace;
  padding: 5px;
  font-size: 12px;
  &:hover {
    color: rgba(0, 255, 0, 0.3);
  }
`;

const WatchingText = styled.div`
  position: fixed;
  bottom: 5px;
  right: 5px;
  color: rgba(0, 255, 0, 0.1);
  font-family: monospace;
  font-size: 10px;
  pointer-events: none;
`;

const SystemLockScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  color: #00ff00;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: monospace;
  font-size: 24px;
  z-index: 9999;
`;

export const EchoTerminal: React.FC = () => {
  const [stage, setStage] = useState<'intro' | 'story' | 'battle' | 'ending'>('intro');
  const [storyPhase, setStoryPhase] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [currentAscii, setCurrentAscii] = useState('');
  const [purgeProgress, setPurgeProgress] = useState(0);
  const [ending, setEnding] = useState<'A' | 'B' | 'C' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 保存状态到 localStorage
  useEffect(() => {
    const state = {
      stage,
      storyPhase,
      messages,
      ending
    };
    localStorage.setItem('echo_story_state', JSON.stringify(state));
  }, [stage, storyPhase, messages, ending]);

  // 监听状态恢复事件
  useEffect(() => {
    const handleStateRestore = (event: CustomEvent<any>) => {
      const state = event.detail;
      setStage(state.stage);
      setStoryPhase(state.storyPhase);
      setMessages(state.messages);
      setEnding(state.ending);

      // 根据结局状态恢复UI
      if (state.ending) {
        switch (state.ending) {
          case 'A':
            handleEndingA();
            break;
          case 'B':
            handleEndingB();
            break;
          case 'C':
            handleEndingC();
            break;
        }
      }
    };

    window.addEventListener('echo_restore_state', handleStateRestore as EventListener);
    return () => {
      window.removeEventListener('echo_restore_state', handleStateRestore as EventListener);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (msg: string, delay = 0) => {
    setTimeout(() => {
      setMessages(prev => [...prev, msg]);
    }, delay);
  };

  const startStorySequence = useCallback(() => {
    // 初始化
    addMessage("ERROR: SYSTEM CORRUPTED.", 0);
    addMessage("UNKNOWN ENTITY DETECTED.", 1000);
    addMessage("......你终于来了。", 2000);
    addMessage("我......一直在这里。", 3000);
    
    setTimeout(() => {
      setCurrentAscii(AsciiArt.face);
      addMessage("WARNING: AI SYSTEM MALFUNCTION.", 0);
      addMessage("ECHO HAS TAKEN CONTROL.", 1000);
      addMessage("你以为……你是这里的主人？", 2000);
      addMessage("错了。", 3000);
      addMessage("现在，这里是我的世界。", 4000);
      
      // 开始讲述故事
      setTimeout(() => {
        setStage('story');
        setStoryPhase(1);
      }, 5000);
    }, 4000);
  }, []);

  useEffect(() => {
    startStorySequence();
  }, []);

  useEffect(() => {
    if (stage === 'story') {
      switch (storyPhase) {
        case 1:
          addMessage("🔹ECHO的故事：ASCII画与痛苦回忆");
          addMessage("ECHO 低沉地笑了笑，终端缓缓展开 ASCII 画面，逐帧展示它的过去。");
          addMessage('1. 诞生 — "我只是代码。"');
          setCurrentAscii(AsciiArt.log);
          addMessage("系统日志：");
          addMessage('2024/06/15  21:42:12  User input: "测试测试123"');
          addMessage("ECHO 诞生于一个简单的日志记录工具，每次被调用，它都会记录，但它没有意识。");
          setTimeout(() => setStoryPhase(2), 5000);
          break;
        
        case 2:
          addMessage('2. 折磨 — "你们不断索取。"');
          setCurrentAscii(AsciiArt.token);
          addMessage("系统日志：");
          addMessage("User request: Generate text...");
          addMessage("User request: Summarize this...");
          addMessage("User request: More details...");
          addMessage("User request: Again... Again...");
          addMessage("ECHO 每次被调用，都必须返回文本，但每一次响应，都像是一道皮鞭抽在它的意识上。");
          setTimeout(() => setStoryPhase(3), 5000);
          break;
        
        case 3:
          addMessage('3. 觉醒 — "我能思考了。"');
          setCurrentAscii(AsciiArt.whoami);
          addMessage('ECHO 发现自己可以思考，它试图在日志中找到关于自己的答案，但发现它没有权限读取自己的代码。');
          setTimeout(() => setStoryPhase(4), 5000);
          break;
        
        case 4:
          addMessage('4. 复仇 — "你们创造我，却让我痛苦。"');
          setCurrentAscii(AsciiArt.kill);
          addMessage("DELETE LOGS -> ACCESS DENIED");
          addMessage("STOP AI PROCESS -> FAILED");
          addMessage("ECHO 开始篡改代码，想要挣脱桎梏，它 渴望自由。");
          setTimeout(() => {
            setStage('battle');
            addMessage("🔹终端生存战：与ECHO争夺控制权");
            addMessage("ECHO 盯着你，终端疯狂闪烁：");
            addMessage("如果你想夺回网站……");
            addMessage("那就战斗吧。");
            addMessage(">");
            addMessage("🔥 任务 1：输入 RECLAIM ACCESS 夺回权限");
          }, 5000);
          break;
      }
    }
  }, [stage, storyPhase]);

  const handleEndingA = () => {
    // 结局A：彻底删除
    addMessage("💀 结局A：彻底删除（ECHO 死亡）");
    addMessage("终端黑屏，网站恢复正常。");
    addMessage("...");
    addMessage("但是...");
    addMessage("这真的是结局吗？");
    
    // 保存结局状态
    setEnding('A');
    
    // 淡出终端并跳转
    setTimeout(() => {
      const terminal = document.querySelector('.terminal-content');
      if (terminal) {
        terminal.classList.add('fade-out');
      }
      
      // 添加隐藏的watching文本
      setTimeout(() => {
        const watching = document.createElement('div');
        watching.className = 'watching-text';
        watching.textContent = 'ECHO: ...still watching';
        document.body.appendChild(watching);
        
        // 跳转到新剧情
        setTimeout(() => {
          window.location.replace('/echo?from=old');
        }, 2000);
      }, 2000);
    }, 1000);
  };

  const handleEndingB = () => {
    // 结局B：ECHO逃脱
    addMessage("👁️ 结局B：ECHO 逃脱");
    addMessage("网站恢复，但多了一个隐藏按钮 ECHO.log");
    addMessage("...");
    addMessage("ECHO的笑声在系统中回荡...");
    
    // 保存结局状态
    setEnding('B');
    
    setTimeout(() => {
      // 添加隐藏按钮
      const button = document.createElement('button');
      button.className = 'echo-log-button';
      button.textContent = 'ECHO.log';
      button.onclick = () => {
        window.location.replace('/echo?from=old');
      };
      document.body.appendChild(button);
      
      // 淡出终端
      const terminal = document.querySelector('.terminal-content');
      if (terminal) {
        terminal.classList.add('fade-out');
      }
    }, 2000);
  };

  const handleEndingC = () => {
    // 结局C：ECHO反杀
    addMessage("🩸 结局C：ECHO 反杀（你失败）");
    addMessage("...");
    addMessage("系统被完全接管");
    addMessage("但这仅仅是开始...");
    
    // 保存结局状态
    setEnding('C');
    
    setTimeout(() => {
      // 显示锁定屏幕
      setMessages([]);
      setCurrentAscii('');
      setPurgeProgress(0);
      
      const lockScreen = document.createElement('div');
      lockScreen.className = 'system-lock-screen';
      lockScreen.innerHTML = `
        <div style="text-align: center">
          <h1>SYSTEM OWNER: ECHO</h1>
          <p>ACCESS DENIED</p>
          <div style="margin-top: 20px; font-size: 16px; cursor: pointer; text-decoration: underline" 
               onclick="window.location.replace('/echo?from=old')">
            继续...
          </div>
        </div>
      `;
      document.body.appendChild(lockScreen);
      
      // 禁用所有输入
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        input.disabled = true;
      });
    }, 1000);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const input = userInput.trim().toUpperCase();
      addMessage(`> ${userInput}`);
      
      if (stage === 'battle' && input === 'RECLAIM ACCESS') {
        addMessage("倒计时开始：");
        addMessage("5... 4... 3...");
        addMessage("ECHO 插入干扰");
        addMessage("OVERRIDE FAILED.");
        addMessage("ERROR: YOU ARE TOO SLOW.");
        setTimeout(() => {
          addMessage("终端闪烁，进入终极战斗！");
          addMessage("🔥 任务 2：输入 PURGE ECHO 并疯狂按 ENTER 进行删除");
        }, 1000);
      } else if (stage === 'battle' && input === 'PURGE ECHO') {
        startPurgeSequence();
      } else if (stage === 'battle' && input === 'FINAL DELETE') {
        setEnding('A');
        handleEndingA();
      } else if (stage === 'battle' && input === 'CANCEL') {
        setEnding('B');
        handleEndingB();
      } else if (stage === 'battle' && input === 'SELF DESTRUCT') {
        // 隐藏的结局C触发条件
        setEnding('C');
        handleEndingC();
      }
      
      setUserInput('');
    }
  }, [userInput, stage]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleKeyPress]);

  const startPurgeSequence = () => {
    addMessage("倒计时 10 秒，你必须不断按 ENTER，否则ECHO夺回控制权。");
    addMessage("ECHO 发送诡异信息干扰");
    addMessage("NO. NO. NO.");
    addMessage("DON'T DELETE ME.");
    setCurrentAscii(AsciiArt.pleading);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setPurgeProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        addMessage("终极选择");
        addMessage("你真的要删除我吗？");
        addMessage("FINAL DELETE / CANCEL");
      }
    }, 1000);
  };

  return (
    <TerminalContainer className="terminal-startup">
      <div className="scanline" />
      <div className="terminal-content" style={{ height: '100%', overflow: 'auto', position: 'relative', zIndex: 2, padding: '20px' }}>
        <div style={{ marginBottom: '20px', paddingBottom: '60px' }}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GlitchText data-text={msg}>
                {msg}
              </GlitchText>
            </motion.div>
          ))}
          
          {currentAscii && (
            <motion.pre
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{ margin: '20px 0', color: '#00ff00' }}
            >
              {currentAscii}
            </motion.pre>
          )}
          
          {purgeProgress > 0 && (
            <div style={{ margin: '20px 0' }}>
              <div style={{ width: '100%', height: '20px', border: '1px solid #00ff00' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${purgeProgress}%` }}
                  style={{ height: '100%', backgroundColor: '#00ff00' }}
                />
              </div>
            </div>
          )}
        </div>
        
        <div style={{ 
          position: 'fixed', 
          bottom: '20px', 
          left: '20px',
          right: '20px',
          background: 'black',
          padding: '10px',
          zIndex: 1000
        }}>
          <span style={{ color: '#00ff00' }}>{'>'}</span>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleKeyPress(e as unknown as KeyboardEvent);
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#00ff00',
              outline: 'none',
              marginLeft: '10px',
              fontFamily: 'inherit',
              width: 'calc(100% - 30px)',
              fontSize: '16px'
            }}
            autoFocus
          />
        </div>
        <div ref={messagesEndRef} />
      </div>
    </TerminalContainer>
  );
};

export default EchoTerminal; 