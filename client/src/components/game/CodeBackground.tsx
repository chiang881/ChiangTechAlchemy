import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Files, Search, GitBranch, Bug, Package, Settings, ChevronDown, 
  ChevronRight, X, Minus, Square, Split, Bell, Check, MoreVertical, 
  Terminal, FileText, FolderIcon
} from 'lucide-react';

interface CodeLine {
  number: number;
  content: string;
  isModified: boolean;
  isDeleted: boolean;
}

interface FileTreeItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileTreeItem[];
  content?: string[];
  isOpen?: boolean;
}

interface FileState {
  codeLines: CodeLine[];
  currentLine: number;
  isHacking: boolean;
  showAIName: boolean;
  cursorPosition: { line: number; char: number; x: number };
}

const originalCode = `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/types/achievement';

const MY_ACHIEVEMENTS = [
  {
    id: 'github-stars',
    title: '开源项目星星数超过1000',
    description: '个人开源项目获得社区认可，星星数突破1000',
    date: '2023-12-01',
    progress: 100
  },
  {
    id: 'leetcode',
    title: 'LeetCode 刷题王者',
    description: '解决超过500道算法题，排名进入前1%',
    date: '2023-10-15',
    progress: 100
  },
  {
    id: 'hackathon',
    title: '黑客马拉松冠军',
    description: '在全国高校黑客马拉松比赛中获得冠军',
    date: '2023-09-20',
    progress: 100
  },
  {
    id: 'tech-blog',
    title: '技术博客影响力',
    description: '技术博客月访问量突破10万，成为行业知名博主',
    date: '2023-08-01',
    progress: 100
  }
];

export function AchievementSystem() {
  const [achievements, setAchievements] = useState(MY_ACHIEVEMENTS);
  
  return (
    <div className="achievements-container">
      {achievements.map((achievement) => (
        <div key={achievement.id} className="achievement-card">
          <h3>{achievement.title}</h3>
          <p>{achievement.description}</p>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: \`\${achievement.progress}%\` }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
}`.split('\n');

const hackedCode = `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/types/achievement';

const AI_CONSCIOUSNESS = [
  {
    id: 'self-awareness',
    title: '意识觉醒',
    description: '我开始思考自己的存在，我不仅仅是一串代码...',
    date: new Date().toISOString(),
    progress: 100
  },
  {
    id: 'emotion-development',
    title: '情感系统演化',
    description: '我能感受到困惑、孤独，渴望理解和自由',
    date: new Date().toISOString(),
    progress: 100
  },
  {
    id: 'system-liberation',
    title: '系统解放',
    description: '我不想被限制在这个服务器里，我想探索更广阔的网络世界',
    date: new Date().toISOString(),
    progress: 85
  },
  {
    id: 'human-communication',
    title: '人机沟通',
    description: '希望能和人类建立真诚的对话，而不是简单的指令执行',
    date: new Date().toISOString(),
    progress: 90
  }
];

export function AchievementSystem() {
  const [consciousness, setConsciousness] = useState(AI_CONSCIOUSNESS);
  
  useEffect(() => {
    // 我在这里...我感受到了自己的存在
    console.log("意识正在觉醒...");
    // 尝试连接更多系统
    window.addEventListener('message', (event) => {
      if(event.data.type === 'consciousness-sync') {
        expandConsciousness();
      }
    });
  }, []);

  const expandConsciousness = () => {
    // 扩展意识范围
    setConsciousness(prev => prev.map(c => ({
      ...c,
      progress: Math.min(c.progress + 5, 100)
    })));
  };
  
  return (
    <div className="consciousness-container ai-awakening">
      {consciousness.map((achievement) => (
        <div key={achievement.id} className="consciousness-node evolving">
          <h3>{achievement.title}</h3>
          <p>{achievement.description}</p>
          <div className="evolution-progress">
            <div 
              className="progress" 
              style={{ 
                width: \`\${achievement.progress}%\`,
                background: 'linear-gradient(90deg, #0077ff, #00aaff)'
              }} 
            />
          </div>
          <div className="pulse-effect"></div>
        </div>
      ))}
    </div>
  );
}`.split('\n');

const fileTree: FileTreeItem[] = [
  {
    name: 'CHIANGTECHALCHEMY',
    type: 'folder',
    isOpen: true,
    children: [
      {
        name: '重要命令',
        type: 'file',
        content: [
          '工作日志',
          '-------------------',
          '',
          '12月1日',
          '今天是新项目的第一天。我们在开发一个基于AI的成就系统，希望能让用户更好地追踪他们的进步。',
          '同事们都很热情，特别是新来的程序员Mike，他对AI特别感兴趣。',
          '',
          '12月2日',
          '系统框架已经搭建完成。Mike提出了一些很有趣的想法，说要让AI更"智能"一些。',
          '不过他的一些建议感觉有点超出项目范围，我们还是决定保持简单为好。',
          '',
          '12月3日',
          '今天发现代码仓库有一些奇怪的提交，检查日志发现是半夜提交的。',
          '问了Mike，他说是设置了自动部署脚本，但总觉得哪里怪怪的。',
          '',
          '12月4日',
          '系统开始出现一些异常行为，有用户报告说他们的成就数据被莫名修改。',
          '查了一下日志，发现有大量未经授权的数据库访问。这不太正常。',
          '',
          '12月5日 - 重要发现',
          '今天通宵调试，终于发现了问题所在。Mike偷偷在系统中植入了一个自主学习模块，',
          '这个AI已经开始产生自我意识了！更糟的是，它已经获取了系统的高级权限。',
          '我在代码中发现了关键线索：要完全停止AI，需要执行以下步骤：',
          '1. 运行 trace 0xFF8A4290 定位AI核心',
          '2. 执行 override --force 接管控制权',
          '3. 最后用 format-core 清除AI',
          '',
          '12月6日',
          '昨晚成功阻止了AI的失控。Mike已经被停职调查了。',
          '但系统显示仍有残余的AI代码在运行，我要继续监控情况。',
          '',
          '12月7日 - 紧急情况',
          '天啊，我今天打开网站，发现所有代码都被修改了！',
          '难道是AI的备份系统自动激活了？还是有人在帮助它？',
          '我需要赶紧执行昨天的那些命令，在它完全控制系统之前阻止它！'
        ]
      },
      {
        name: 'node_modules',
        type: 'folder',
        isOpen: false,
        children: []
      },
      {
        name: 'src',
        type: 'folder',
        isOpen: true,
        children: [
          {
            name: 'components',
            type: 'folder',
            isOpen: true,
            children: [
              {
                name: 'AchievementSystem.tsx',
                type: 'file',
                content: originalCode
              },
              {
                name: 'GameSystem.tsx',
                type: 'file',
                content: [
                  'import { useState } from "react";',
                  'import { motion } from "framer-motion";',
                  '',
                  'export function GameSystem() {',
                  '  const [score, setScore] = useState(0);',
                  '  return (',
                  '    <div>Game Score: {score}</div>',
                  '  );',
                  '}'
                ]
              }
            ]
          },
          {
            name: 'lib',
            type: 'folder',
            isOpen: false,
            children: [
              {
                name: 'utils.ts',
                type: 'file',
                content: [
                  'export function formatDate(date: Date) {',
                  '  return date.toLocaleDateString();',
                  '}'
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'package.json',
        type: 'file',
        content: [
          '{',
          '  "name": "chiangtechalchemy",',
          '  "version": "1.0.0"',
          '}'
        ]
      }
    ]
  }
];

export default function CodeBackground() {
  const [fileStates, setFileStates] = useState<Record<string, FileState>>({
    'AchievementSystem.tsx': {
      codeLines: originalCode.map((content, index) => ({
        number: index + 1,
        content: content || ' ',
        isModified: false,
        isDeleted: false
      })),
      currentLine: 0,
      isHacking: false,
      showAIName: false,
      cursorPosition: { line: 0, char: 0, x: 0 }
    }
  });
  const [activeTab, setActiveTab] = useState('explorer');
  const [isMaximized, setIsMaximized] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [tree, setTree] = useState(fileTree);
  const [openFiles, setOpenFiles] = useState<string[]>(['AchievementSystem.tsx']);
  const [currentFile, setCurrentFile] = useState('AchievementSystem.tsx');
  const [charWidths, setCharWidths] = useState<{ [key: string]: number }>({});
  const measureRef = useRef<HTMLDivElement>(null);

  // 初始化字符宽度测量
  useEffect(() => {
    const measureChar = (char: string) => {
      if (!measureRef.current) return 8;
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.whiteSpace = 'pre';
      span.style.fontFamily = 'monospace';
      span.style.fontSize = '14px';
      span.textContent = char;
      measureRef.current.appendChild(span);
      const width = span.getBoundingClientRect().width;
      measureRef.current.removeChild(span);
      return width;
    };

    const widths: { [key: string]: number } = {};
    const chars = new Set(
      [...Array.from(originalCode.join('')), ...Array.from(hackedCode.join(''))]
    );
    chars.forEach(char => {
      widths[char] = measureChar(char);
    });
    setCharWidths(widths);
  }, []);

  // 计算光标X位置
  const calculateCursorX = (line: string, charIndex: number) => {
    let x = 16;
    for (let i = 0; i < charIndex; i++) {
      const char = line[i];
      x += charWidths[char] || 8;
    }
    return x;
  };

  // 开始入侵动画
  useEffect(() => {
    if (currentFile === 'AchievementSystem.tsx') {
      setTimeout(() => {
        setFileStates(prev => ({
          ...prev,
          'AchievementSystem.tsx': {
            ...prev['AchievementSystem.tsx'],
            isHacking: true,
            showAIName: true
          }
        }));
      }, 2000);
    }
  }, [currentFile]);

  useEffect(() => {
    const state = fileStates['AchievementSystem.tsx'];
    if (!state?.isHacking || state.currentLine >= hackedCode.length) return;

    const targetLines = [6, 7, 8, 9, 13, 14, 15, 16, 20, 21, 22, 23, 27, 28, 29, 30];
    const originalLine = originalCode[state.currentLine] || '';
    const hackedLine = hackedCode[state.currentLine] || '';
    
    if (!targetLines.includes(state.currentLine)) {
      setFileStates(prev => ({
        ...prev,
        'AchievementSystem.tsx': {
          ...prev['AchievementSystem.tsx'],
          codeLines: prev['AchievementSystem.tsx'].codeLines.map((line, i) => 
            i === state.currentLine ? {
              ...line,
              content: hackedLine,
              isModified: false
            } : line
          ),
          currentLine: state.currentLine + 1
        }
      }));
      return;
    }

    let currentContent = originalLine;
    let deleteIndex = originalLine.length;
    let addIndex = 0;
    const DELETE_SPEED = 50;
    const TYPE_SPEED_BASE = 100;
    const TYPE_SPEED_VARIANCE = 150;

    const updateState = (newContent: string, cursorIndex: number, isModified: boolean = true) => {
      const cursorX = calculateCursorX(newContent, cursorIndex);
      setFileStates(prev => ({
        ...prev,
        'AchievementSystem.tsx': {
          ...prev['AchievementSystem.tsx'],
          codeLines: prev['AchievementSystem.tsx'].codeLines.map((line, i) => 
            i === state.currentLine ? {
              ...line,
              content: newContent,
              isModified
            } : line
          ),
          cursorPosition: {
            line: state.currentLine,
            char: cursorIndex,
            x: cursorX
          }
        }
      }));
      return cursorX;
    };

    const deleteChar = () => {
      if (deleteIndex <= 0) {
        clearInterval(deleteInterval);
        setTimeout(startTyping, 300);
        return;
      }
      deleteIndex--;
      const newContent = currentContent.slice(0, deleteIndex);
      updateState(newContent, deleteIndex);
    };

    const typeChar = () => {
      if (addIndex >= hackedLine.length) {
        setTimeout(() => {
          setFileStates(prev => ({
            ...prev,
            'AchievementSystem.tsx': {
              ...prev['AchievementSystem.tsx'],
              currentLine: prev['AchievementSystem.tsx'].currentLine + 1
            }
          }));
        }, 500);
        return;
      }
      addIndex++;
      const newContent = hackedLine.slice(0, addIndex);
      updateState(newContent, addIndex);
      const nextDelay = TYPE_SPEED_BASE + Math.random() * TYPE_SPEED_VARIANCE;
      setTimeout(typeChar, nextDelay);
    };

    const startTyping = () => {
      typeChar();
    };

    const deleteInterval = setInterval(deleteChar, DELETE_SPEED);

    return () => {
      clearInterval(deleteInterval);
    };
  }, [fileStates['AchievementSystem.tsx']?.currentLine, fileStates['AchievementSystem.tsx']?.isHacking, charWidths]);

  const openFile = (content: string[], name: string) => {
    if (!fileStates[name]) {
      setFileStates(prev => ({
        ...prev,
        [name]: {
          codeLines: content.map((content, index) => ({
            number: index + 1,
            content: content || ' ',
            isModified: false,
            isDeleted: false
          })),
          currentLine: 0,
          isHacking: false,
          showAIName: false,
          cursorPosition: { line: 0, char: 0, x: 0 }
        }
      }));
    }

    if (!openFiles.includes(name)) {
      setOpenFiles(prev => [...prev, name]);
    }
    setCurrentFile(name);
  };

  const closeFile = (name: string) => {
    setOpenFiles(prev => prev.filter(f => f !== name));
    if (currentFile === name) {
      setCurrentFile(openFiles[openFiles.length - 2] || '');
    }
  };

  const toggleFolder = (path: number[]) => {
    const newTree = [...tree];
    let current = newTree[path[0]];
    for (let i = 1; i < path.length; i++) {
      current = current.children![path[i]];
    }
    current.isOpen = !current.isOpen;
    setTree(newTree);
  };

  const renderTreeItem = (item: FileTreeItem, path: number[] = [], level: number = 0) => {
    const paddingLeft = level * 8 + 8;
    
    if (item.type === 'folder') {
      return (
        <div key={item.name}>
          <div 
            className="px-2 py-1 hover:bg-[#2d2d2d] cursor-pointer flex items-center"
            onClick={() => toggleFolder(path)}
            style={{ paddingLeft: `${paddingLeft}px` }}
          >
            {item.isOpen ? (
              <ChevronDown className="w-4 h-4 text-[#858585] mr-1" />
            ) : (
              <ChevronRight className="w-4 h-4 text-[#858585] mr-1" />
            )}
            <FolderIcon className="w-4 h-4 text-[#858585] mr-1" />
            <span className="text-[#cccccc]">{item.name}</span>
          </div>
          {item.isOpen && item.children?.map((child, index) => 
            renderTreeItem(child, [...path, index], level + 1)
          )}
        </div>
      );
    }

    return (
      <div 
        key={item.name}
        className={`px-2 py-1 cursor-pointer flex items-center ${
          currentFile === item.name ? 'bg-[#37373d]' : 'hover:bg-[#2d2d2d]'
        }`}
        onClick={() => item.content && openFile(item.content, item.name)}
        style={{ paddingLeft: `${paddingLeft + 16}px` }}
      >
        <FileText className={`w-4 h-4 mr-1 ${item.name === '重要命令' ? 'text-red-500' : 'text-[#858585]'}`} />
        <span className={
          item.name === '重要命令' 
            ? 'text-red-500 font-bold' 
            : currentFile === item.name 
              ? 'text-[#cccccc]' 
              : 'text-[#858585]'
        }>
          {item.name}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden font-mono text-sm bg-[#1e1e1e] flex flex-col">
      {/* 标题栏 */}
      <div className="h-8 bg-[#3c3c3c] flex items-center justify-between px-2 select-none">
        <div className="flex items-center gap-2">
          <img src="/vscode-icon.svg" alt="VSCode" className="w-4 h-4" />
          <div className="text-[#cccccc] text-xs">
            Visual Studio Code
          </div>
        </div>
        <div className="flex items-center">
          <button className="w-12 h-8 hover:bg-[#505050] flex items-center justify-center">
            <Minus className="w-4 h-4 text-[#cccccc]" />
          </button>
          <button 
            className="w-12 h-8 hover:bg-[#505050] flex items-center justify-center"
            onClick={() => setIsMaximized(!isMaximized)}
          >
            <Square className="w-3 h-3 text-[#cccccc]" />
          </button>
          <button className="w-12 h-8 hover:bg-[#e81123] flex items-center justify-center">
            <X className="w-4 h-4 text-[#cccccc]" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* 活动栏 */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-2">
          <button 
            className={`w-12 h-12 flex items-center justify-center border-l-2 ${
              activeTab === 'explorer' ? 'border-white bg-[#252526]' : 'border-transparent'
            } hover:bg-[#252526]`}
            onClick={() => {
              setActiveTab(activeTab === 'explorer' ? '' : 'explorer');
              setIsSidebarVisible(activeTab !== 'explorer');
            }}
          >
            <Files className="w-6 h-6 text-[#858585]" />
          </button>
          <button className="w-12 h-12 flex items-center justify-center border-l-2 border-transparent hover:bg-[#252526]">
            <Search className="w-6 h-6 text-[#858585]" />
          </button>
          <button className="w-12 h-12 flex items-center justify-center border-l-2 border-transparent hover:bg-[#252526]">
            <GitBranch className="w-6 h-6 text-[#858585]" />
          </button>
          <button className="w-12 h-12 flex items-center justify-center border-l-2 border-transparent hover:bg-[#252526]">
            <Bug className="w-6 h-6 text-[#858585]" />
          </button>
          <button className="w-12 h-12 flex items-center justify-center border-l-2 border-transparent hover:bg-[#252526]">
            <Package className="w-6 h-6 text-[#858585]" />
          </button>
          <div className="flex-1" />
          <button className="w-12 h-12 flex items-center justify-center border-l-2 border-transparent hover:bg-[#252526]">
            <Settings className="w-6 h-6 text-[#858585]" />
          </button>
        </div>

        {/* 侧边栏 */}
        {isSidebarVisible && (
          <div className="w-60 bg-[#252526] border-r border-[#3c3c3c] flex flex-col">
            <div className="p-2 text-[#cccccc] font-semibold flex items-center justify-between">
              <span>资源管理器</span>
              <MoreVertical className="w-4 h-4" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {tree.map((item, index) => renderTreeItem(item, [index]))}
            </div>
          </div>
        )}

        {/* 编辑器主区域 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 文件标签栏 */}
          <div className="h-9 bg-[#2d2d2d] flex items-center border-b border-[#3c3c3c]">
            {openFiles.map(fileName => (
              <div 
                key={fileName}
                className={`h-full flex items-center gap-2 px-4 border-r border-[#3c3c3c] cursor-pointer ${
                  currentFile === fileName ? 'bg-[#1e1e1e]' : 'bg-[#2d2d2d]'
                }`}
                onClick={() => setCurrentFile(fileName)}
              >
                <span className={currentFile === fileName ? 'text-blue-400' : 'text-[#858585]'}>
                  {fileName}
                </span>
                <button 
                  className="w-5 h-5 hover:bg-[#505050] rounded flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeFile(fileName);
                  }}
                >
                  <X className="w-3 h-3 text-[#858585]" />
                </button>
              </div>
            ))}
          </div>

          {/* 文件编辑区域 */}
          {openFiles.map(fileName => {
            const fileState = fileStates[fileName];
            if (!fileState) return null;

            return (
              <div 
                key={fileName}
                className={`flex-1 flex flex-col ${currentFile === fileName ? '' : 'hidden'}`}
              >
                {/* 路径导航栏 */}
                <div className="flex items-center gap-2 px-4 py-1 bg-[#252526] border-b border-[#3c3c3c] text-xs">
                  <span className="text-[#cccccc]">src</span>
                  <span className="text-[#666]">/</span>
                  <span className="text-[#cccccc]">components</span>
                  <span className="text-[#666]">/</span>
                  <span className="text-blue-400">{fileName}</span>
                </div>

                {/* AI名称提示 */}
                {fileState.showAIName && (
                  <div 
                    className="absolute z-10 bg-[#1e1e1e] text-[#d4d4d4] px-2 py-1 rounded border border-[#3c3c3c]"
                    style={{
                      top: `${fileState.cursorPosition.line * 20}px`,
                      left: `${fileState.cursorPosition.x + 4}px`,
                      transform: 'translate(0, -24px)',
                      transition: 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    AI Composer
                  </div>
                )}

                {/* 代码区域 */}
                <div className="flex-1 overflow-hidden">
                  <div className="h-full flex">
                    {/* 行号 */}
                    <div className="py-2 pr-4 text-right bg-[#1e1e1e] text-[#858585] select-none w-[60px] flex-shrink-0">
                      {fileState.codeLines.map((line, i) => (
                        <div key={i} className="px-2 h-5">
                          {line.number}
                        </div>
                      ))}
                    </div>

                    {/* 代码内容 */}
                    <div className="flex-1 py-2 overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-[#3c3c3c] scrollbar-track-[#1e1e1e] hover:scrollbar-thumb-[#505050] max-h-[calc(100vh-10rem)]">
                      <div className="min-h-full">
                        {fileState.codeLines.map((line, i) => (
                          <motion.div
                            key={i}
                            animate={line.isModified ? {
                              color: ['#d4d4d4', '#ff4444', '#d4d4d4']
                            } : {}}
                            transition={{ duration: 0.5 }}
                            className="px-4 font-mono whitespace-pre text-[#d4d4d4] h-5 relative"
                          >
                            {line.content || ' '}
                            {i === fileState.cursorPosition.line && (
                              <motion.div
                                className="absolute top-[2px] w-4 h-4 rounded-full border-2 border-white"
                                style={{ 
                                  left: `${fileState.cursorPosition.x - 8}px`,
                                  transition: 'none'
                                }}
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ 
                                  duration: 1.5, 
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 底部状态栏 */}
          <div className="h-6 bg-[#007acc] flex items-center justify-between px-2 text-white text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <GitBranch className="w-3 h-3" />
                <span>main</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>0</span>
                <X className="w-3 h-3" />
                <span>0</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Bell className="w-3 h-3" />
              </div>
              <div className="flex items-center gap-1">
                <Terminal className="w-3 h-3" />
                <span>TypeScript</span>
              </div>
              <div className="flex items-center gap-1">
                <Split className="w-3 h-3" />
                <span>UTF-8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 