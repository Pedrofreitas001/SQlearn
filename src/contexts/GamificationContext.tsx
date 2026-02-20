import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { curriculum } from '@/data/curriculum';

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
};

type GamificationContextType = {
  xp: number;
  level: number;
  levelTitle: string;
  completedLessons: string[];
  achievements: Achievement[];
  streak: number;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  nextLevelXp: number;
  progressToNextLevel: number;
  totalLessons: number;
};

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const LEVEL_BASE = 100;
const LEVEL_MULTIPLIER = 1.5;

const LEVEL_TITLES: Record<number, string> = {
  1: 'Aprendiz SQL',
  2: 'Estagiário de Dados',
  3: 'Analista Júnior',
  4: 'Analista Pleno',
  5: 'Analista Sênior',
  6: 'Engenheiro de Dados',
  7: 'Especialista SQL',
  8: 'Arquiteto de Dados',
  9: 'Mestre SQL',
  10: 'Lenda dos Bancos',
};

const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first-query',     title: 'Primeiro SELECT',      description: 'Complete sua primeira lição.',                     icon: 'search' },
  { id: 'module-1-done',   title: 'Fundamentos Completos', description: 'Complete todas as lições do Módulo 1.',           icon: 'check_circle' },
  { id: 'module-2-done',   title: 'Mestre da Agregação',  description: 'Complete todas as lições do Módulo 2.',            icon: 'functions' },
  { id: 'module-3-done',   title: 'Rei dos JOINs',        description: 'Complete todas as lições de JOINs.',               icon: 'merge' },
  { id: 'module-4-done',   title: 'SQL Avançado',         description: 'Complete o módulo de SQL Avançado.',                icon: 'bolt' },
  { id: 'module-5-done',   title: 'Analista de Negócios', description: 'Complete todos os casos de negócio.',              icon: 'business_center' },
  { id: 'module-6-done',   title: 'Window Master',        description: 'Complete o módulo de Window Functions.',            icon: 'window' },
  { id: 'halfway',         title: 'Metade do Caminho',    description: 'Complete metade de todas as lições.',               icon: 'flag' },
  { id: 'all-complete',    title: 'Graduado SQL',         description: 'Complete todas as lições da plataforma.',           icon: 'school' },
  { id: 'streak-3',        title: '3 Dias Seguidos',      description: 'Estude por 3 dias consecutivos.',                   icon: 'local_fire_department' },
  { id: 'streak-7',        title: 'Semana On Fire',       description: 'Estude por 7 dias consecutivos.',                   icon: 'whatshot' },
  { id: 'ten-lessons',     title: 'Dedicado',             description: 'Complete 10 lições.',                               icon: 'star' },
];

function getModuleLessonIds(moduleId: string): string[] {
  const mod = curriculum.find(m => m.id === moduleId);
  return mod ? mod.lessons.map(l => l.id) : [];
}

function calculateStreak(activityDates: string[]): number {
  if (activityDates.length === 0) return 0;

  const unique = [...new Set(activityDates)].sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // Streak must include today or yesterday
  if (unique[0] !== today && unique[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 0; i < unique.length - 1; i++) {
    const curr = new Date(unique[i]);
    const prev = new Date(unique[i + 1]);
    const diff = (curr.getTime() - prev.getTime()) / 86400000;
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXp] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activityDates, setActivityDates] = useState<string[]>([]);

  const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);

  // Load from localStorage
  useEffect(() => {
    const savedXp = localStorage.getItem('sql-academy-xp');
    const savedLessons = localStorage.getItem('sql-academy-lessons');
    const savedAchievements = localStorage.getItem('sql-academy-achievements');
    const savedDates = localStorage.getItem('sql-academy-dates');

    if (savedXp) setXp(parseInt(savedXp));
    if (savedLessons) setCompletedLessons(JSON.parse(savedLessons));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedDates) setActivityDates(JSON.parse(savedDates));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('sql-academy-xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('sql-academy-lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('sql-academy-achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('sql-academy-dates', JSON.stringify(activityDates));
  }, [activityDates]);

  const level = Math.max(1, Math.floor(Math.log(xp / LEVEL_BASE + 1) / Math.log(LEVEL_MULTIPLIER)) + 1);
  const levelTitle = LEVEL_TITLES[Math.min(level, 10)] || LEVEL_TITLES[10];

  const currentLevelXp = LEVEL_BASE * (Math.pow(LEVEL_MULTIPLIER, level - 1) - 1);
  const nextLevelXpTotal = LEVEL_BASE * (Math.pow(LEVEL_MULTIPLIER, level) - 1);
  const xpForNextLevel = nextLevelXpTotal - currentLevelXp;
  const xpProgressInLevel = xp - currentLevelXp;
  const progressToNextLevel = Math.min(100, Math.max(0, (xpProgressInLevel / xpForNextLevel) * 100));

  const streak = calculateStreak(activityDates);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      if (prev.some(a => a.id === id)) return prev;
      const def = ALL_ACHIEVEMENTS.find(a => a.id === id);
      if (!def) return prev;
      return [...prev, { ...def, unlockedAt: new Date().toISOString() }];
    });
  }, []);

  const checkAchievements = useCallback((lessons: string[], dates: string[]) => {
    // First query
    if (lessons.length >= 1) unlockAchievement('first-query');

    // 10 lessons
    if (lessons.length >= 10) unlockAchievement('ten-lessons');

    // Halfway
    if (lessons.length >= Math.ceil(totalLessons / 2)) unlockAchievement('halfway');

    // All complete
    if (lessons.length >= totalLessons) unlockAchievement('all-complete');

    // Module completions
    const moduleChecks: [string, string][] = [
      ['mod-1', 'module-1-done'],
      ['mod-2', 'module-2-done'],
      ['mod-3', 'module-3-done'],
      ['mod-4', 'module-4-done'],
      ['mod-5', 'module-5-done'],
      ['mod-6', 'module-6-done'],
    ];

    for (const [modId, achId] of moduleChecks) {
      const modLessons = getModuleLessonIds(modId);
      if (modLessons.length > 0 && modLessons.every(l => lessons.includes(l))) {
        unlockAchievement(achId);
      }
    }

    // Streak achievements
    const currentStreak = calculateStreak(dates);
    if (currentStreak >= 3) unlockAchievement('streak-3');
    if (currentStreak >= 7) unlockAchievement('streak-7');
  }, [totalLessons, unlockAchievement]);

  const addXp = useCallback((amount: number) => {
    setXp(prev => prev + amount);
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    if (completedLessons.includes(lessonId)) return;

    const today = new Date().toISOString().split('T')[0];
    const newLessons = [...completedLessons, lessonId];
    const newDates = [...activityDates, today];

    setCompletedLessons(newLessons);
    setActivityDates(newDates);
    addXp(50);

    // Defer achievement check to next tick so state is updated
    setTimeout(() => checkAchievements(newLessons, newDates), 0);
  }, [completedLessons, activityDates, addXp, checkAchievements]);

  return (
    <GamificationContext.Provider value={{
      xp,
      level,
      levelTitle,
      completedLessons,
      achievements,
      streak,
      addXp,
      completeLesson,
      nextLevelXp: Math.round(xpForNextLevel),
      progressToNextLevel,
      totalLessons,
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
