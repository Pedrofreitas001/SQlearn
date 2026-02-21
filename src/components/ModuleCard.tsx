import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Lock, Play, ArrowRight, GraduationCap, Layers, GitMerge, Zap, Briefcase, PanelTop } from 'lucide-react';
import clsx from 'clsx';
import { Module } from '@/data/curriculum';

const MODULE_ICONS: Record<string, React.ElementType> = {
  'mod-1': GraduationCap,
  'mod-2': Layers,
  'mod-3': GitMerge,
  'mod-4': Zap,
  'mod-5': Briefcase,
  'mod-6': PanelTop,
};

const LEVEL_BADGE_COLORS: Record<string, string> = {
  'Iniciante': 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
  'Intermediário': 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  'Avançado': 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400',
  'Expert': 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
};

type ModuleCardProps = {
  module: Module;
  progress: number;
  isLocked: boolean;
};

export function ModuleCard({ module, progress, isLocked }: ModuleCardProps) {
  const IconComponent = MODULE_ICONS[module.id] || GraduationCap;

  return (
    <div className={clsx(
      "relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border transition-all duration-300 group",
      isLocked
        ? "opacity-60 border-slate-200 dark:border-slate-700"
        : "border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-violet-200 dark:hover:border-violet-500/30 hover:-translate-y-0.5"
    )}>
      {isLocked && (
        <div className="absolute inset-0 bg-slate-50/60 dark:bg-slate-900/50 backdrop-blur-[1px] rounded-2xl flex items-center justify-center z-10">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
            <Lock size={20} className="text-slate-400" />
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className={clsx(
          "p-3 rounded-xl",
          isLocked
            ? "bg-slate-100 dark:bg-slate-700 text-slate-400"
            : "bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 text-violet-600 dark:text-violet-400"
        )}>
          <IconComponent size={22} />
        </div>
        {progress === 100 ? (
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
            <CheckCircle size={13} />
            <span>Concluído</span>
          </div>
        ) : progress > 0 ? (
          <span className={clsx(
            "text-xs font-bold px-2.5 py-1 rounded-full",
            LEVEL_BADGE_COLORS[module.level] || 'bg-slate-50 text-slate-500'
          )}>
            {progress}%
          </span>
        ) : (
          <span className={clsx(
            "text-[10px] font-bold px-2 py-1 rounded-full",
            LEVEL_BADGE_COLORS[module.level] || 'bg-slate-50 text-slate-500'
          )}>
            {module.level}
          </span>
        )}
      </div>

      <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">{module.title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 leading-relaxed">{module.description}</p>
      <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-4">
        {module.lessons.length} lições
      </p>

      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 mb-4">
        <div
          className={clsx(
            "h-1.5 rounded-full transition-all duration-500",
            progress === 100
              ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
              : "bg-gradient-to-r from-violet-400 to-indigo-500"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      <Link
        to={isLocked ? '#' : `/module/${module.id}`}
        className={clsx(
          "flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-all",
          isLocked
            ? "bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
            : "bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white shadow-lg shadow-violet-500/15 hover:shadow-xl hover:shadow-violet-500/20"
        )}
      >
        {progress === 0 ? <Play size={15} fill="currentColor" /> : <ArrowRight size={15} />}
        <span>{progress === 0 ? 'Começar' : progress === 100 ? 'Revisar' : 'Continuar'}</span>
      </Link>
    </div>
  );
}
