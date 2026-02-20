import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Lock, Play } from 'lucide-react';
import clsx from 'clsx';
import { Module } from '@/data/curriculum';

type ModuleCardProps = {
  module: Module;
  progress: number;
  isLocked: boolean;
};

export function ModuleCard({ module, progress, isLocked }: ModuleCardProps) {
  return (
    <div className={clsx(
      "relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300",
      isLocked ? "opacity-75 grayscale" : "hover:shadow-md hover:border-blue-500/50"
    )}>
      {isLocked && (
        <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-[1px] rounded-2xl flex items-center justify-center z-10">
          <Lock size={32} className="text-slate-400" />
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className={clsx(
          "p-3 rounded-xl",
          isLocked ? "bg-slate-100 dark:bg-slate-700 text-slate-400" : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
        )}>
          {/* Simple icon placeholder based on module icon string */}
          <span className="material-symbols-outlined text-2xl">{module.icon}</span>
        </div>
        {progress === 100 ? (
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
            <CheckCircle size={14} />
            <span>Concluído</span>
          </div>
        ) : (
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {progress}% Completo
          </span>
        )}
      </div>

      <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">{module.title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{module.description}</p>
      <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-4">
        {module.lessons.length} lições · {module.level}
      </p>

      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 mb-4">
        <div 
          className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <Link 
        to={isLocked ? '#' : `/module/${module.id}`}
        className={clsx(
          "flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-colors",
          isLocked 
            ? "bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
        )}
      >
        {progress === 0 ? <Play size={16} /> : <span className="material-symbols-outlined text-sm">resume</span>}
        <span>{progress === 0 ? 'Começar' : 'Continuar'}</span>
      </Link>
    </div>
  );
}
