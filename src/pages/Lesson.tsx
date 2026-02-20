import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGamification } from '@/contexts/GamificationContext';
import { curriculum, Lesson as LessonType } from '@/data/curriculum';
import { executeQuery } from '@/lib/db';
import { SqlEditor } from '@/components/SqlEditor';
import { ResultTable } from '@/components/ResultTable';
import { SchemaPanel } from '@/components/SchemaPanel';
import { ArrowLeft, CheckCircle, HelpCircle, ChevronRight, ChevronLeft, List, Database, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';

export function Lesson() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { completeLesson, completedLessons } = useGamification();

  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSchemaOpen, setIsSchemaOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (moduleId && lessonId) {
      const module = curriculum.find(m => m.id === moduleId);
      const foundLesson = module?.lessons.find(l => l.id === lessonId);

      if (foundLesson) {
        setLesson(foundLesson);
        setCode(foundLesson.initialCode);
        setResult(null);
        setError(null);
        setIsSuccess(false);
        setShowHint(false);
        setAttempts(0);
        setFeedback(null);
      } else {
        navigate('/');
      }
    }
  }, [moduleId, lessonId, navigate]);

  const handleRun = async () => {
    if (!lesson) return;

    setIsRunning(true);
    setError(null);
    setResult(null);
    setIsSuccess(false);
    setFeedback(null);

    try {
      const userResult = executeQuery(code);

      if (userResult.error) {
        setError(userResult.error);
        setIsRunning(false);
        setAttempts(prev => prev + 1);
        return;
      }

      setResult(userResult.data as any[]);

      const solutionResult = executeQuery(lesson.solution);

      const userData = userResult.data as any[];
      const solData = solutionResult.data as any[];

      // Normalize for comparison: lowercase keys, round numbers, trim strings
      const normalize = (rows: any[]) => {
        if (!rows || rows.length === 0) return [];
        return rows.map(row => {
          const normalized: Record<string, any> = {};
          for (const [key, val] of Object.entries(row)) {
            const k = key.toLowerCase().trim();
            if (typeof val === 'number') {
              normalized[k] = Math.round(val * 100) / 100;
            } else if (typeof val === 'string') {
              normalized[k] = val.trim();
            } else {
              normalized[k] = val;
            }
          }
          return normalized;
        });
      };

      const normUser = normalize(userData);
      const normSol = normalize(solData);

      // Compare: same columns, same number of rows, same values
      const isMatch = normUser.length === normSol.length &&
        normUser.length > 0 &&
        JSON.stringify(normUser) === JSON.stringify(normSol);

      if (isMatch) {
        setIsSuccess(true);
        setFeedback(null);
        completeLesson(lesson.id);
      } else {
        setAttempts(prev => prev + 1);

        if (!userData || userData.length === 0) {
          setFeedback('Sua query não retornou nenhum resultado. Verifique as condições do WHERE ou os nomes das tabelas.');
        } else if (solData && userData.length !== solData.length) {
          setFeedback(`Sua query retornou ${userData.length} linha(s), mas o esperado é ${solData.length}. Verifique seus filtros ou agrupamentos.`);
        } else if (solData && userData.length > 0 && solData.length > 0) {
          const userCols = Object.keys(normUser[0]).sort();
          const solCols = Object.keys(normSol[0]).sort();
          if (userCols.length !== solCols.length || userCols.join(',') !== solCols.join(',')) {
            setFeedback(`As colunas do resultado estão diferentes do esperado. Verifique quais colunas você está selecionando e os alias (AS).`);
          } else {
            setFeedback('O resultado está próximo, mas os valores ou a ordenação não conferem. Tente novamente!');
          }
        } else {
          setFeedback('Resultado incorreto. Releia a explicação e tente novamente.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido ao executar query.');
      setAttempts(prev => prev + 1);
    } finally {
      setIsRunning(false);
    }
  };

  const handleShowSolution = () => {
    if (lesson) {
      setCode(lesson.solution);
    }
  };

  const handleNextLesson = () => {
    if (!lesson) return;

    const module = curriculum.find(m => m.id === moduleId);
    if (!module) return;

    const currentIndex = module.lessons.findIndex(l => l.id === lesson.id);
    if (currentIndex < module.lessons.length - 1) {
      navigate(`/module/${moduleId}/lesson/${module.lessons[currentIndex + 1].id}`);
    } else {
      const currentModuleIndex = curriculum.findIndex(m => m.id === moduleId);
      if (currentModuleIndex < curriculum.length - 1) {
        const nextModule = curriculum[currentModuleIndex + 1];
        navigate(`/module/${nextModule.id}/lesson/${nextModule.lessons[0].id}`);
      } else {
        navigate('/');
      }
    }
  };

  const handlePrevLesson = () => {
    if (!lesson) return;

    const module = curriculum.find(m => m.id === moduleId);
    if (!module) return;

    const currentIndex = module.lessons.findIndex(l => l.id === lesson.id);
    if (currentIndex > 0) {
      navigate(`/module/${moduleId}/lesson/${module.lessons[currentIndex - 1].id}`);
    } else {
      const currentModuleIndex = curriculum.findIndex(m => m.id === moduleId);
      if (currentModuleIndex > 0) {
        const prevModule = curriculum[currentModuleIndex - 1];
        const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
        navigate(`/module/${prevModule.id}/lesson/${lastLesson.id}`);
      }
    }
  };

  if (!lesson) return null;

  const currentModule = curriculum.find(m => m.id === moduleId);
  const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedTotal = completedLessons.length;

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 h-14 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            title="Voltar ao início"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <List size={18} />
          </button>

          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight">{lesson.title}</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1">
              {currentModule?.title}
              <span className="hidden md:inline"> — Lição {currentModule?.lessons.findIndex(l => l.id === lesson.id)! + 1} de {currentModule?.lessons.length}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Schema toggle */}
          <button
            onClick={() => setIsSchemaOpen(!isSchemaOpen)}
            className={clsx(
              "hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border",
              isSchemaOpen
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                : "bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
            )}
          >
            <Database size={13} />
            Schema
          </button>

          <button
            onClick={handlePrevLesson}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="hidden md:flex items-center gap-1 px-2">
            {currentModule?.lessons.map((l) => (
              <div
                key={l.id}
                className={clsx(
                  "w-2 h-2 rounded-full transition-colors cursor-pointer",
                  l.id === lesson.id ? "bg-blue-600 dark:bg-blue-400 scale-125" :
                  completedLessons.includes(l.id) ? "bg-emerald-500 dark:bg-emerald-400" :
                  "bg-slate-200 dark:bg-slate-700"
                )}
                title={l.title}
                onClick={() => navigate(`/module/${moduleId}/lesson/${l.id}`)}
              />
            ))}
          </div>

          <button
            onClick={handleNextLesson}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Lesson Navigation Sidebar */}
        <div className={clsx(
          "absolute inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out shadow-xl",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Conteúdo do Módulo</h3>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
              <X size={16} />
            </button>
          </div>
          <div className="overflow-y-auto h-full pb-20">
            {currentModule?.lessons.map((l, idx) => (
              <button
                key={l.id}
                onClick={() => {
                  navigate(`/module/${moduleId}/lesson/${l.id}`);
                  setIsSidebarOpen(false);
                }}
                className={clsx(
                  "w-full text-left p-4 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-start gap-3",
                  l.id === lesson.id && "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500"
                )}
              >
                <div className={clsx(
                  "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                  completedLessons.includes(l.id)
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : l.id === lesson.id
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                )}>
                  {completedLessons.includes(l.id) ? <CheckCircle size={12} /> : idx + 1}
                </div>
                <div>
                  <p className={clsx("text-sm font-medium", l.id === lesson.id ? "text-blue-700 dark:text-blue-400" : "text-slate-700 dark:text-slate-300")}>
                    {l.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Left Panel: Content */}
        <aside className="w-1/3 min-w-[320px] max-w-[480px] hidden md:flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto z-10">
          <div className="p-6 pb-20">
            <div className="prose prose-slate dark:prose-invert prose-sm max-w-none mb-6">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-3 pb-2 border-b border-slate-100 dark:border-slate-700" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-5 mb-2" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-base font-medium text-slate-800 dark:text-slate-200 mt-4 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3 text-sm" {...props} />,
                  code: ({node, className, children, ...props}) => {
                    return !className?.includes('language-') ? (
                      <code className="bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                  pre: ({node, ...props}) => (
                    <pre className="bg-slate-900 text-slate-50 p-3 rounded-xl overflow-x-auto mb-4 border border-slate-800 text-xs leading-relaxed" {...props} />
                  ),
                  ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 space-y-1 text-slate-600 dark:text-slate-300 mb-3 text-sm" {...props} />,
                  li: ({node, ...props}) => <li className="pl-1" {...props} />,
                  table: ({node, ...props}) => <div className="overflow-x-auto mb-4 rounded-xl border border-slate-200 dark:border-slate-600"><table className="text-xs w-full border-collapse" {...props} /></div>,
                  thead: ({node, ...props}) => <thead className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-slate-700 dark:to-slate-700" {...props} />,
                  th: ({node, ...props}) => <th className="text-left px-4 py-2.5 font-bold text-violet-700 dark:text-violet-300 border-b border-slate-200 dark:border-slate-600 text-[11px] uppercase tracking-wider" {...props} />,
                  td: ({node, ...props}) => <td className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300" {...props} />,
                  tr: ({node, ...props}) => <tr className="even:bg-slate-50/50 dark:even:bg-slate-800/30 hover:bg-violet-50/30 dark:hover:bg-violet-900/10 transition-colors" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-violet-400 dark:border-violet-500 pl-4 py-2 my-3 bg-violet-50/50 dark:bg-violet-900/10 rounded-r-lg text-sm" {...props} />,
                  strong: ({node, ...props}) => <strong className="text-slate-900 dark:text-white font-semibold" {...props} />,
                }}
              >
                {lesson.content}
              </ReactMarkdown>
            </div>

            {/* Challenge Box */}
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-800 rounded-xl p-5 relative overflow-hidden">
              <h3 className="flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400 mb-2 uppercase tracking-wider">
                Desafio
              </h3>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {lesson.description}
              </p>

              <div className="mt-4 pt-3 border-t border-violet-100 dark:border-violet-800/50 space-y-3">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
                >
                  <HelpCircle size={14} />
                  {showHint ? 'Esconder Dica' : 'Preciso de uma dica'}
                </button>

                {showHint && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-xs rounded-lg border border-yellow-100 dark:border-yellow-800/50">
                    <span className="font-bold mr-1">Dica:</span> {lesson.hint}
                  </div>
                )}

                {attempts >= 3 && !isSuccess && (
                  <button
                    onClick={handleShowSolution}
                    className="w-full py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg border border-red-100 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2"
                  >
                    Mostrar Resposta
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Editor & Results */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-900">
          {/* Mobile: show lesson content as collapsible */}
          <div className="md:hidden p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mr-2">Desafio:</span>
              {lesson.description}
            </p>
            <button
              onClick={() => setShowHint(!showHint)}
              className="mt-2 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 flex items-center gap-1"
            >
              <HelpCircle size={12} />
              {showHint ? 'Esconder' : 'Dica'}
            </button>
            {showHint && (
              <p className="mt-2 text-xs text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">{lesson.hint}</p>
            )}
          </div>

          {/* Editor */}
          <div className="flex-1 min-h-[40%] relative">
            <SqlEditor
              initialValue={code}
              onChange={(val) => setCode(val || '')}
              onRun={handleRun}
              isRunning={isRunning}
            />
          </div>

          {/* Results */}
          <div className="flex-1 min-h-[40%] bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 relative">
            <ResultTable data={result} error={error} loading={isRunning} />

            {/* Feedback for incorrect answers */}
            {feedback && !isSuccess && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20">
                <div className="bg-orange-50 dark:bg-orange-900/90 backdrop-blur-md border border-orange-200 dark:border-orange-500/50 shadow-lg rounded-xl p-3 flex items-start gap-3">
                  <div className="bg-orange-500 rounded-full p-1 text-white shrink-0 mt-0.5">
                    <X size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-orange-800 dark:text-orange-100">Ainda não está correto</h4>
                    <p className="text-xs text-orange-600 dark:text-orange-300 mt-0.5">{feedback}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Overlay */}
            {isSuccess && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20">
                <div className="bg-emerald-50 dark:bg-emerald-900/90 backdrop-blur-md border border-emerald-200 dark:border-emerald-500/50 shadow-2xl rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500 rounded-full p-1 text-white shadow-sm">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-100">Correto!</h4>
                      <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-0.5">+50 XP ganhos</p>
                    </div>
                  </div>
                  <button
                    onClick={handleNextLesson}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap flex items-center gap-1"
                  >
                    Próxima
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Schema */}
        {isSchemaOpen && (
          <div className="hidden md:block w-56 shrink-0">
            <SchemaPanel />
          </div>
        )}
      </main>
    </div>
  );
}
