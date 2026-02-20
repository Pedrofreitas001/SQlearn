import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/contexts/GamificationContext';
import { curriculum } from '@/data/curriculum';
import { ModuleCard } from '@/components/ModuleCard';
import { Layout } from '@/components/Layout';
import { Flame, Star, Trophy } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const { xp, level, completedLessons, nextLevelXp, progressToNextLevel, achievements } = useGamification();

  // Calculate progress for each module
  const getModuleProgress = (moduleId: string) => {
    const module = curriculum.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const totalLessons = module.lessons.length;
    const completedInModule = module.lessons.filter(l => completedLessons.includes(l.id)).length;
    
    return Math.round((completedInModule / totalLessons) * 100);
  };

  // Determine if a module is locked (previous module must be completed)
  const isModuleLocked = (index: number) => {
    if (index === 0) return false;
    const prevModule = curriculum[index - 1];
    return getModuleProgress(prevModule.id) < 100;
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Olá, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-slate-500 dark:text-slate-400">Vamos continuar aprendendo SQL hoje?</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-full px-4 py-2 shadow-sm border border-slate-200 dark:border-slate-700">
              <Flame className="text-orange-500 mr-2" size={20} />
              <span className="font-bold text-slate-700 dark:text-slate-200">12 Dias</span>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Level Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-blue-100 font-medium mb-1 flex items-center gap-2">
                    <Trophy size={18} />
                    Nível Atual
                  </p>
                  <h3 className="text-4xl font-black tracking-tight">Nível {level}</h3>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-100">Próximo Rank</span>
                  <p className="font-bold text-white">Analista Pleno</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-bold mb-2 text-blue-100">
                  <span>Progresso para o Nível {level + 1}</span>
                  <span>{Math.round(progressToNextLevel)}%</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                  <div 
                    className="bg-white h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
                    style={{ width: `${progressToNextLevel}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 w-full h-full animate-pulse"></div>
                  </div>
                </div>
                <p className="text-xs text-blue-200 mt-2 text-right">Faltam apenas {nextLevelXp} XP para subir de nível!</p>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="text-yellow-500" size={20} />
              Conquistas Recentes
            </h3>
            
            <div className="space-y-4 flex-1 overflow-y-auto pr-2">
              {achievements.slice(0, 3).map((ach) => (
                <div key={ach.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0">
                    <span className="material-symbols-outlined text-xl">{ach.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{ach.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section id="modules">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">library_books</span>
              Meus Módulos
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
