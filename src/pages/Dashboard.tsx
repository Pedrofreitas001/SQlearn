import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/contexts/GamificationContext';
import { curriculum } from '@/data/curriculum';
import { ModuleCard } from '@/components/ModuleCard';
import { Layout } from '@/components/Layout';
import { Flame, Star, Trophy, Target } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const {
    xp,
    level,
    levelTitle,
    completedLessons,
    nextLevelXp,
    progressToNextLevel,
    achievements,
    streak,
    totalLessons,
  } = useGamification();

  const getModuleProgress = (moduleId: string) => {
    const module = curriculum.find(m => m.id === moduleId);
    if (!module) return 0;
    const completed = module.lessons.filter(l => completedLessons.includes(l.id)).length;
    return Math.round((completed / module.lessons.length) * 100);
  };

  const isModuleLocked = (index: number) => {
    if (index === 0) return false;
    return getModuleProgress(curriculum[index - 1].id) < 100;
  };

  const overallProgress = Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              Olá, {user?.name?.split(' ')[0]}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {completedLessons.length === 0
                ? 'Vamos começar sua jornada no SQL!'
                : `${completedLessons.length} de ${totalLessons} lições concluídas`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {streak > 0 && (
              <div className="flex items-center bg-orange-50 dark:bg-orange-900/20 rounded-full px-4 py-2 border border-orange-200 dark:border-orange-800">
                <Flame className="text-orange-500 mr-2" size={18} />
                <span className="font-bold text-sm text-orange-700 dark:text-orange-300">{streak} {streak === 1 ? 'dia' : 'dias'}</span>
              </div>
            )}
            <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 rounded-full px-4 py-2 border border-blue-200 dark:border-blue-800">
              <Star className="text-blue-500 mr-2" size={18} />
              <span className="font-bold text-sm text-blue-700 dark:text-blue-300">{xp} XP</span>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Level Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-blue-100 font-medium mb-1 flex items-center gap-2 text-sm">
                    <Trophy size={16} />
                    Nível Atual
                  </p>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight">Nível {level}</h3>
                  <p className="text-blue-200 text-sm mt-1">{levelTitle}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10 text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Progresso Geral</span>
                  <p className="font-bold text-white text-lg">{overallProgress}%</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold mb-2 text-blue-100">
                  <span>Progresso para o Nível {level + 1}</span>
                  <span>{Math.round(progressToNextLevel)}%</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progressToNextLevel}%` }}
                  />
                </div>
                <p className="text-xs text-blue-200 mt-2 text-right">
                  Faltam {nextLevelXp - Math.round(xp - (100 * (Math.pow(1.5, level - 1) - 1)))} XP para o próximo nível
                </p>
              </div>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
            <h3 className="font-bold text-base mb-4 text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="text-yellow-500" size={18} />
              Conquistas ({achievements.length}/12)
            </h3>

            {achievements.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
                <Target className="text-slate-300 dark:text-slate-600 mb-2" size={32} />
                <p className="text-sm text-slate-400 dark:text-slate-500">Complete lições para desbloquear conquistas</p>
              </div>
            ) : (
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {achievements.slice(-4).reverse().map((ach) => (
                  <div key={ach.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div className="w-9 h-9 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0">
                      <span className="material-symbols-outlined text-lg">{ach.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">{ach.title}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Modules Grid */}
        <section id="modules">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Trilha de Aprendizado
            </h2>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {curriculum.length} módulos · {totalLessons} lições
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                progress={getModuleProgress(module.id)}
                isLocked={isModuleLocked(index)}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
