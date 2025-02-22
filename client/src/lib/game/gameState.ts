import { create } from 'zustand';

export type GameChapter = 'none' | 'prologue' | 'dataAbyss' | 'codeAwakening' | 'finalChoice';
export type AIChoice = 'none' | 'format' | 'shutdown';

interface GameState {
  isGameActive: boolean;
  showError: boolean;
  currentChapter: GameChapter;
  terminalCommands: string[];
  aiChoice: AIChoice;
  progressPercentage: number;
  activateGame: () => void;
  setChapter: (chapter: GameChapter) => void;
  addCommand: (command: string) => void;
  setChoice: (choice: AIChoice) => void;
  setProgress: (progress: number) => void;
  resetGame: () => void;
  showInitialError: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  isGameActive: false,
  showError: false,
  currentChapter: 'none',
  terminalCommands: [],
  aiChoice: 'none',
  progressPercentage: 0,

  showInitialError: () => set({ showError: true }),
  activateGame: () => set({ isGameActive: true, showError: false, currentChapter: 'prologue' }),
  setChapter: (chapter) => set({ currentChapter: chapter }),
  addCommand: (command) => set((state) => ({ 
    terminalCommands: [...state.terminalCommands, command] 
  })),
  setChoice: (choice) => set({ aiChoice: choice }),
  setProgress: (progress) => set({ progressPercentage: progress }),
  resetGame: () => set({ 
    isGameActive: false,
    showError: false,
    currentChapter: 'none',
    terminalCommands: [],
    aiChoice: 'none',
    progressPercentage: 0
  })
}));