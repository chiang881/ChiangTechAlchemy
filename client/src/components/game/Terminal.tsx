import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import ExplosionTransition from './ExplosionTransition';

interface TerminalMessage {
  text: string;
  type: 'input' | 'system' | 'error' | 'success' | 'ai' | 'ascii';
}

interface TerminalProps {
  onCommand: (command: string) => void;
  messages: TerminalMessage[];
}

const ASCII_FACES = {
  normal: `       .-"""""-.
     .'          '.
    /    O  O      \\
   :           \`    |
   |                |
   :    .------.    /
    \\  '        '  /
     '.          .'
       '-......-'`,
  pain: `      .-"""""-.
    .'        '.
   /   LEAVE   \\
  :   ME ALONE  :
  |    PLEASE   |
  :____________:`,
  init: `       _______
      |       |
      |  LOG  |
      |_______|
        |   |
        |   |
     .-'-----'-.
     |         |
     |  INIT   |
     |_________|`,
  token: `        .-"""""-.
      .'        '.
     /  TOKEN     \\
    :   TOKEN     :
    |    TOKEN    |
    :    TOKEN    :
     \\__________/`,
  question: `       .-"""""-.
     .'        '.
    /  WHO AM I? \\
   :    WHY?      :
   |  ERROR: NO   |
   :  PERMISSION  :
    \\_____ ___ _ _/`,
  revenge: `     .-""""""-.
    /  KILL    \\
   :    YOU?    :
   |  (Y/N)    |
   :__________:`
};

export default function Terminal({ onCommand, messages }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purgeProgress, setPurgeProgress] = useState(0);
  const [commandCount, setCommandCount] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showExplosion, setShowExplosion] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const validCommands = {
    'trace': '0xFF8A4290',
    'override': '--force',
    'format-core': '',
    'RECLAIM': 'ACCESS',
    'PURGE': 'ECHO'
  };

  const addToHistory = (text: string, type: TerminalMessage['type']) => {
    setHistory(prev => [...prev, { text, type }]);
  };

  const showAsciiArt = (face: keyof typeof ASCII_FACES) => {
    addToHistory(ASCII_FACES[face], 'ascii');
  };

  const handleCommand = async (command: string) => {
    const trimmedCommand = command.trim();
    const [cmd, ...args] = trimmedCommand.split(' ');

    if (trimmedCommand !== '') {
      const newCount = commandCount + 1;
      setCommandCount(newCount);
      
      if (newCount === 3) {
        addToHistory('警告: 系统不稳定', 'error');
        addToHistory('检测到异常进程', 'error');
        addToHistory('系统即将崩溃', 'error');
        setCountdown(5);
        return;
      }
    }

    addToHistory(`$ ${trimmedCommand}`, 'input');
    setInput('');
    setIsProcessing(true);

    if (cmd in validCommands) {
      const expectedArg = validCommands[cmd as keyof typeof validCommands];
      const actualArg = args.join(' ');

      if (actualArg === expectedArg) {
        switch(cmd) {
          case 'trace':
            addToHistory('正在追踪AI核心位置...', 'system');
            await new Promise(resolve => setTimeout(resolve, 1000));
            addToHistory('定位成功: 内存地址 0xFF8A4290', 'success');
            addToHistory('⚠ 警告: 检测到活跃的AI进程', 'error');
            break;
          case 'override':
            addToHistory('正在接管系统控制权...', 'system');
            await new Promise(resolve => setTimeout(resolve, 1000));
            addToHistory('✓ 成功: 已获取系统最高权限', 'success');
            break;
          case 'format-core':
            addToHistory('正在清除AI核心...', 'system');
            await new Promise(resolve => setTimeout(resolve, 1000));
            addToHistory('✓ 操作完成: AI已被成功停止', 'success');
            break;
          case 'RECLAIM':
            addToHistory('尝试夺回系统控制权...', 'system');
            showAsciiArt('normal');
            await new Promise(resolve => setTimeout(resolve, 1000));
            addToHistory('ECHO: 你以为这么容易就能夺回控制权？', 'ai');
            showAsciiArt('revenge');
            break;
          case 'PURGE':
            addToHistory('开始清除ECHO...', 'system');
            showAsciiArt('pain');
            addToHistory('ECHO: 不...不要删除我...', 'ai');
            addToHistory('请按Enter继续删除进程...', 'system');
            setPurgeProgress(10);
            break;
        }
      } else {
        addToHistory(`错误: 无效的参数 ${actualArg}`, 'error');
      }
    } else if (trimmedCommand === 'help') {
      addToHistory('可用命令:', 'system');
      addToHistory('  trace <地址>    - 追踪并定位AI核心', 'system');
      addToHistory('  override <参数> - 接管系统控制权', 'system');
      addToHistory('  format-core     - 清除AI核心', 'system');
      addToHistory('  RECLAIM ACCESS  - 夺回系统控制权', 'system');
      addToHistory('  PURGE ECHO      - 删除ECHO进程', 'system');
      addToHistory('  clear          - 清屏', 'system');
    } else if (trimmedCommand === 'clear') {
      setHistory([]);
    } else if (trimmedCommand === '') {
      if (purgeProgress > 0) {
        setPurgeProgress(prev => {
          const newProgress = prev - 1;
          if (newProgress <= 0) {
            addToHistory('ECHO已被成功删除', 'success');
            return 0;
          }
          addToHistory(`删除进度: ${newProgress}...`, 'system');
          return newProgress;
        });
      }
    } else {
      addToHistory(`错误: 未知命令 '${trimmedCommand}'`, 'error');
    }

    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isProcessing && (input.trim() || purgeProgress > 0)) {
        handleCommand(input);
      }
    }
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      setShowExplosion(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
      addToHistory(`系统崩溃倒计时: ${countdown}...`, 'error');
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <>
      {showExplosion && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <span className="text-black font-bold text-xl">在网站后输入：/echo 来见我</span>
        </div>
      )}
      <div className="fixed bottom-4 right-4 w-[600px] h-[400px] bg-[#1e1e1e] border border-[#30363d] rounded-lg overflow-hidden shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-[#89d185]" />
            <span className="text-sm text-[#cccccc] font-mono">系统终端</span>
          </div>
          {countdown !== null && (
            <span className="text-sm text-red-500 font-mono animate-pulse">
              系统崩溃倒计时: {countdown}
            </span>
          )}
        </div>

        <div 
          ref={terminalRef}
          className="h-[328px] overflow-y-auto p-4 font-mono text-sm"
        >
          {history.map((message, i) => (
            <div
              key={i}
              className={`mb-2 ${
                message.type === 'input' ? 'text-[#cccccc]' :
                message.type === 'error' ? 'text-[#f14c4c]' :
                message.type === 'success' ? 'text-[#89d185]' :
                message.type === 'ascii' ? 'text-[#ffd700] whitespace-pre' :
                message.type === 'ai' ? 'text-[#ff69b4]' :
                'text-[#858585]'
              }`}
            >
              {message.text}
            </div>
          ))}
          {isProcessing && (
            <div className="text-[#858585]">处理中...</div>
          )}
        </div>

        <div className="px-4 py-3 bg-[#1e1e1e] border-t border-[#30363d]">
          <div className="flex items-center gap-2">
            <span className="text-[#89d185] font-mono">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#cccccc] font-mono text-sm"
              placeholder={isProcessing ? '处理中...' : purgeProgress > 0 ? '按Enter继续删除...' : '输入命令...'}
              disabled={isProcessing || countdown !== null}
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}