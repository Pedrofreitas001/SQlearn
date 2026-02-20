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
            <div className="flex items-center bg-violet-50 dark:bg-violet-900/20 rounded-full px-4 py-2 border border-violet-200 dark:border-violet-800">
              <Star className="text-violet-500 mr-2" size={18} />
              <span className="font-bold text-sm text-violet-700 dark:text-violet-300">{xp} XP</span>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Level Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-violet-100 dark:border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-violet-200/30 dark:bg-violet-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-200/20 dark:bg-indigo-500/5 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-violet-500 dark:text-violet-400 font-semibold mb-1 flex items-center gap-2 text-sm">
                    <Trophy size={16} />
                    Nível Atual
                  </p>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-white">Nível {level}</h3>
                  <p className="text-violet-400 dark:text-violet-300 text-sm mt-1 font-medium">{levelTitle}</p>
                </div>
                <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-md rounded-xl px-5 py-3 border border-violet-100 dark:border-slate-600 text-right shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">Progresso Geral</span>
                  <p className="font-black text-slate-800 dark:text-white text-xl">{overallProgress}%</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-600 dark:text-slate-300">Progresso para o Nível {level + 1}</span>
                  <span className="text-violet-600 dark:text-violet-400">{Math.round(progressToNextLevel)}%</span>
                </div>
                <div className="w-full bg-violet-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-violet-400 to-indigo-500 dark:from-violet-500 dark:to-indigo-400 h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                    style={{ width: `${progressToNextLevel}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-right">
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
