import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/game/gameEngine';
import DataCorruption from './DataCorruption';
import AIDialogue from './AIDialogue';
import FinalChoice from './FinalChoice';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

export default function GameOverlay() {
  const { isActive, stage, startGame } = useGameStore();

  useEffect(() => {
    // 随机在5-15秒后触发错误弹窗
    const timeout = setTimeout(() => {
      const errorDialog = document.getElementById('error-trigger');
      if (errorDialog) {
        errorDialog.click();
      }
    }, 5000 + Math.random() * 10000);

    return () => clearTimeout(timeout);
  }, []);

  if (!isActive && stage === 'inactive') {
    return (
      <AlertDialog>
        <AlertDialogTrigger id="error-trigger" className="hidden">
          Trigger Error
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-black border border-red-500 p-6 max-w-md mx-auto">
          <div className="text-center space-y-4" onClick={startGame}>
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-red-500">
              🔥 CRITICAL ERROR
            </h2>
            <p className="text-red-300">
              核心成就数据被未知进程篡改
            </p>
            <div className="mt-4 p-2 bg-red-500/10 rounded text-red-300 cursor-pointer hover:bg-red-500/20 transition-colors">
              点击启动深度扫描
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
      >
        <div className="container mx-auto h-full flex items-center justify-center">
          {stage === 'dataCorruption' && <DataCorruption />}
          {stage === 'codeSpace' && <AIDialogue />}
          {stage === 'finalChoice' && <FinalChoice />}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}