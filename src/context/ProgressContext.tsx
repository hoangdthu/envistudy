import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState<{
    completedModules: string[];
    quizScores: Record<string, number>;
    lastVisited: string | null;
  }>(() => {
    const saved = localStorage.getItem('envi-study-progress');
    return saved ? JSON.parse(saved) : {
      completedModules: [],
      quizScores: {},
      lastVisited: null
    };
  });

  useEffect(() => {
    localStorage.setItem('envi-study-progress', JSON.stringify(progress));
  }, [progress]);

  const completeModule = (moduleId) => {
    setProgress(prev => ({
      ...prev,
      completedModules: prev.completedModules.includes(moduleId) 
        ? prev.completedModules 
        : [...prev.completedModules, moduleId]
    }));
  };

  const saveQuizScore = (quizId, score) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [quizId]: Math.max(prev.quizScores[quizId] || 0, score)
      }
    }));
  };

  return (
    <ProgressContext.Provider value={{ progress, completeModule, saveQuizScore }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
