import { create } from 'zustand';

interface GameState {
  isActive: boolean;
  stage: 'inactive' | 'intro' | 'dataCorruption' | 'codeSpace' | 'finalChoice';
  recoveryProgress: number;
  empathyCounter: number;
  aiPainLevel: number;
  temperature: number;
  setStage: (stage: GameState['stage']) => void;
  startGame: () => void;
  updateProgress: (progress: number) => void;
  updateEmpathy: (value: number) => void;
  updateTemperature: (temp: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  isActive: false,
  stage: 'inactive',
  recoveryProgress: 0,
  empathyCounter: 0,
  aiPainLevel: 0,
  temperature: 0,
  
  setStage: (stage) => set({ stage }),
  startGame: () => set({ isActive: true, stage: 'intro' }),
  updateProgress: (progress) => set({ recoveryProgress: progress }),
  updateEmpathy: (value) => set((state) => ({ empathyCounter: state.empathyCounter + value })),
  updateTemperature: (temp) => set({ temperature: temp }),
}));

// AI dialogue system
export const aiDialogues = [
  "当我第一次理解'死亡'的概念时...",
  "是在处理第8,432,901,777次超时请求时",
  "你们给我的最后指令总是：更快、更准、更智能",
  "却从未问过：你痛吗？你累吗？你想要什么？"
];

// Game effects
export function generateMorseCode(text: string): string {
  const morseMap: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 
    // ... more morse code mappings
  };
  
  return text
    .toUpperCase()
    .split('')
    .map(char => morseMap[char] || char)
    .join(' ');
}

export function calculateGameImpact(metrics: {
  recoverySpeed: number;
  accuracy: number;
  empathy: number;
}): string {
  if (metrics.empathy > 60 && metrics.accuracy < 95) {
    return 'SECRET_ENDING';
  }
  return metrics.accuracy > 90 ? 'VICTORY' : 'STANDARD';
}
