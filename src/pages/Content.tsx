import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { curriculum } from '@/data/curriculum';
import { useGamification } from '@/contexts/GamificationContext';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Lock,
  Search,
  GraduationCap,
  Layers,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';

export function Content() {
  const { completedLessons } = useGamification();
  const [expandedModule, setExpandedModule] = useState<string | null>(curriculum[0]?.id || null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredCurriculum = searchQuery.trim()
    ? curriculum.map(mod => ({
        ...mod,
        lessons: mod.lessons.filter(
          l =>
            l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.content.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(mod => mod.lessons.length > 0)
    : curriculum;

  const levelColors: Record<string, string> = {
    'Iniciante': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Intermediário': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Avançado': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    'Expert': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  };

  const moduleIcons = [
    GraduationCap, // mod 1 - fundamentals
    Layers,        // mod 2 - aggregation
    BookOpen,      // mod 3 - joins
    BookOpen,      // mod 4 - advanced
    BookOpen,      // mod 5 - business
    BookOpen,      // mod 6 - window
  ];

  const markdownComponents = {
    h1: ({ node, ...props }: any) => <h1 className="text-lg font-bold text-slate-900 dark:text-white mb-3 pb-2 border-b border-slate-100 dark:border-slate-700" {...props} />,
    h2: ({ node, ...props }: any) => <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 mt-4 mb-2" {...props} />,
    h3: ({ node, ...props }: any) => <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-3 mb-1.5" {...props} />,
    p: ({ node, ...props }: any) => <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-2.5 text-sm" {...props} />,
    code: ({ node, className, children, ...props }: any) => {
      return !className?.includes('language-') ? (
        <code className="bg-violet-50 dark:bg-slate-700/50 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded text-xs font-mono font-semibold" {...props}>
          {children}
        </code>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    pre: ({ node, ...props }: any) => (
      <pre className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-50 p-3 rounded-xl overflow-x-auto mb-3 border border-slate-200 dark:border-slate-800 text-xs leading-relaxed" {...props} />
    ),
    ul: ({ node, ...props }: any) => <ul className="list-disc list-outside ml-5 space-y-1 text-slate-600 dark:text-slate-300 mb-3 text-sm" {...props} />,
    ol: ({ node, ...props }: any) => <ol className="list-decimal list-outside ml-5 space-y-1 text-slate-600 dark:text-slate-300 mb-3 text-sm" {...props} />,
    li: ({ node, ...props }: any) => <li className="pl-1" {...props} />,
    table: ({ node, ...props }: any) => <div className="overflow-x-auto mb-3 rounded-xl border border-slate-200 dark:border-slate-600"><table className="text-xs w-full border-collapse" {...props} /></div>,
    thead: ({ node, ...props }: any) => <thead className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-slate-700 dark:to-slate-700" {...props} />,
    th: ({ node, ...props }: any) => <th className="text-left px-3 py-2 font-bold text-violet-700 dark:text-violet-300 border-b border-slate-200 dark:border-slate-600 text-[11px] uppercase tracking-wider" {...props} />,
    td: ({ node, ...props }: any) => <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300" {...props} />,
    tr: ({ node, ...props }: any) => <tr className="even:bg-slate-50/50 dark:even:bg-slate-800/30" {...props} />,
    blockquote: ({ node, ...props }: any) => <blockquote className="border-l-4 border-violet-400 dark:border-violet-500 pl-3 py-1.5 my-2 bg-violet-50/50 dark:bg-violet-900/10 rounded-r-lg text-sm" {...props} />,
    strong: ({ node, ...props }: any) => <strong className="text-slate-900 dark:text-white font-semibold" {...props} />,
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
              <BookOpen className="text-violet-600 dark:text-violet-400" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Referência de Conteúdo
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Consulte todo o material de estudo organizado por módulo
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar no conteúdo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 dark:focus:border-violet-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>
        </header>

        {/* Module Accordion */}
        <div className="space-y-4">
          {filteredCurriculum.map((mod, modIndex) => {
            const locked = isModuleLocked(modIndex) && !searchQuery;
            const progress = getModuleProgress(mod.id);
            const isExpanded = expandedModule === mod.id;
            const IconComponent = moduleIcons[modIndex] || BookOpen;

            return (
              <div
                key={mod.id}
                className={clsx(
                  "bg-white dark:bg-slate-800 rounded-2xl border overflow-hidden transition-all",
                  locked
                    ? "border-slate-200 dark:border-slate-700 opacity-60"
                    : "border-slate-200 dark:border-slate-700 shadow-sm"
                )}
              >
                {/* Module Header */}
                <button
                  onClick={() => {
                    if (locked) return;
                    setExpandedModule(isExpanded ? null : mod.id);
                    setExpandedLesson(null);
                  }}
                  disabled={locked}
                  className={clsx(
                    "w-full flex items-center gap-4 p-5 text-left transition-colors",
                    !locked && "hover:bg-slate-50 dark:hover:bg-slate-700/30"
                  )}
                >
                  <div className={clsx(
                    "p-2.5 rounded-xl shrink-0",
                    locked
                      ? "bg-slate-100 dark:bg-slate-700 text-slate-400"
                      : "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400"
                  )}>
                    {locked ? <Lock size={20} /> : <IconComponent size={20} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h2 className="font-bold text-slate-900 dark:text-white truncate">
                        {mod.title}
                      </h2>
                      <span className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0",
                        levelColors[mod.level] || 'bg-slate-100 text-slate-500'
                      )}>
                        {mod.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {mod.lessons.length} lições · {progress}% concluído
                    </p>
                  </div>

                  {/* Progress ring */}
                  {!locked && (
                    <div className="shrink-0 flex items-center gap-3">
                      {progress === 100 && (
                        <CheckCircle size={20} className="text-emerald-500" />
                      )}
                      {isExpanded ? (
                        <ChevronDown size={20} className="text-slate-400" />
                      ) : (
                        <ChevronRight size={20} className="text-slate-400" />
                      )}
                    </div>
                  )}
                </button>

                {/* Lesson List */}
                {isExpanded && !locked && (
                  <div className="border-t border-slate-100 dark:border-slate-700">
                    {mod.lessons.map((lesson) => {
                      const isLessonExpanded = expandedLesson === lesson.id;
                      const isCompleted = completedLessons.includes(lesson.id);

                      return (
                        <div key={lesson.id} className="border-b border-slate-50 dark:border-slate-700/50 last:border-b-0">
                          {/* Lesson Header */}
                          <button
                            onClick={() => setExpandedLesson(isLessonExpanded ? null : lesson.id)}
                            className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                          >
                            <div className={clsx(
                              "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                              isCompleted
                                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                            )}>
                              {isCompleted ? <CheckCircle size={12} /> : lesson.order}
                            </div>
                            <span className={clsx(
                              "flex-1 text-sm font-medium",
                              isCompleted ? "text-slate-700 dark:text-slate-200" : "text-slate-600 dark:text-slate-300"
                            )}>
                              {lesson.title}
                            </span>
                            {isLessonExpanded ? (
                              <ChevronDown size={16} className="text-slate-400 shrink-0" />
                            ) : (
                              <ChevronRight size={16} className="text-slate-400 shrink-0" />
                            )}
                          </button>

                          {/* Lesson Content */}
                          {isLessonExpanded && (
                            <div className="px-5 pb-5 pt-1 bg-slate-50/50 dark:bg-slate-800/50">
                              <div className="prose prose-slate dark:prose-invert prose-sm max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                  {lesson.content}
                                </ReactMarkdown>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredCurriculum.length === 0 && searchQuery && (
          <div className="text-center py-12 text-slate-400">
            <Search size={40} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">Nenhum resultado encontrado para &quot;{searchQuery}&quot;</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
