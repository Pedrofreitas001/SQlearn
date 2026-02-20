import React, { createContext, useContext, useState, useEffect } from 'react';

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
};

type GamificationContextType = {
  xp: number;
  level: number;
  completedLessons: string[];
  achievements: Achievement[];
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  nextLevelXp: number;
  progressToNextLevel: number;
};

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const LEVEL_base = 100;
const LEVEL_MULTIPLIER = 1.5;

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXp] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'first-query', title: 'Primeiro SELECT', description: 'Execute sua primeira query com sucesso.', icon: 'search' },
    { id: 'join-master', title: 'Mestre dos JOINS', description: 'Complete o módulo de JOINS.', icon: 'git-merge' },
    { id: 'streak-7', title: 'On Fire!', description: '7 dias seguidos de estudo.', icon: 'flame' },
  ]);

  // Load from local storage on mount
  useEffect(() => {
    const savedXp = localStorage.getItem('sql-academy-xp');
    const savedLessons = localStorage.getItem('sql-academy-lessons');
    
    if (savedXp) setXp(parseInt(savedXp));
    if (savedLessons) setCompletedLessons(JSON.parse(savedLessons));
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('sql-academy-xp', xp.toString());
    localStorage.setItem('sql-academy-lessons', JSON.stringify(completedLessons));
  }, [xp, completedLessons]);

  const level = Math.floor(Math.log(xp / LEVEL_base + 1) / Math.log(LEVEL_MULTIPLIER)) + 1;
  
  // Calculate XP required for next level
  // Formula inverse: XP = BASE * (MULTIPLIER^(LEVEL) - 1)
  const currentLevelXp = LEVEL_base * (Math.pow(LEVEL_MULTIPLIER, level - 1) - 1);
  const nextLevelXpTotal = LEVEL_base * (Math.pow(LEVEL_MULTIPLIER, level) - 1);
  const xpForNextLevel = nextLevelXpTotal - currentLevelXp;
  const xpProgressInLevel = xp - currentLevelXp;
  const progressToNextLevel = Math.min(100, Math.max(0, (xpProgressInLevel / xpForNextLevel) * 100));

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
  };

  const completeLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      addXp(50); // Base XP for completing a lesson
    }
  };

  return (
    <GamificationContext.Provider value={{
      xp,
      level,
      completedLessons,
      achievements,
      addXp,
      completeLesson,
      nextLevelXp: Math.round(xpForNextLevel),
      progressToNextLevel
    }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
