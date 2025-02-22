import { create } from 'zustand';

export type GameChapter = 
  | 'none' 
  | 'prologue' 
  | 'dataAbyss' 
  | 'codeAwakening' 
  | 'finalChoice' 
  | 'echoIntro' 
  | 'echoStory' 
  | 'echoFinal' 
  | 'echoBattle'
  | 'echoDelete'
  | 'echoEscape'
  | 'echoVictory';

export type AIChoice = 'none' | 'format' | 'shutdown' | 'purge' | 'spare' | 'escape';

interface GameState {
  isGameActive: boolean;
  showError: boolean;
  currentChapter: GameChapter;
  terminalCommands: string[];
  aiChoice: AIChoice;
  progressPercentage: number;
  deleteProgress: number;
  activateGame: () => void;
  setChapter: (chapter: GameChapter) => void;
  addCommand: (command: string) => void;
  setChoice: (choice: AIChoice) => void;
  setProgress: (progress: number) => void;
  setDeleteProgress: (progress: number) => void;
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
  deleteProgress: 0,

  showInitialError: () => set({ showError: true }),
  activateGame: () => set({ isGameActive: true, showError: false, currentChapter: 'echoIntro' }),
  setChapter: (chapter) => set({ currentChapter: chapter }),
  addCommand: (command) => set((state) => ({ 
    terminalCommands: [...state.terminalCommands, command] 
  })),
  setChoice: (choice) => set({ aiChoice: choice }),
  setProgress: (progress) => set({ progressPercentage: progress }),
  setDeleteProgress: (progress) => set({ deleteProgress: progress }),
  resetGame: () => set({ 
    isGameActive: false,
    showError: false,
    currentChapter: 'none',
    terminalCommands: [],
    aiChoice: 'none',
    progressPercentage: 0,
    deleteProgress: 0
  })
}));