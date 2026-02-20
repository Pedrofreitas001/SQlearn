import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGamification } from '@/contexts/GamificationContext';
import { curriculum, Lesson as LessonType } from '@/data/curriculum';
import { executeQuery } from '@/lib/db';
import { SqlEditor } from '@/components/SqlEditor';
import { ResultTable } from '@/components/ResultTable';
import { ArrowLeft, CheckCircle, HelpCircle, ChevronRight, ChevronLeft, Menu, List } from 'lucide-react';
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

  // Load lesson data
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

    try {
      // 1. Execute User Query
      const userResult = executeQuery(code);
      
      if (userResult.error) {
        setError(userResult.error);
        setIsRunning(false);
        setAttempts(prev => prev + 1);
        return;
      }

      setResult(userResult.data as any[]);

      // 2. Execute Solution Query (for validation)
      const solutionResult = executeQuery(lesson.solution);
      
      // 3. Compare Results
      const userJson = JSON.stringify(userResult.data);
      const solutionJson = JSON.stringify(solutionResult.data);

      if (userJson === solutionJson) {
        setIsSuccess(true);
        completeLesson(lesson.id);
      } else {
        setAttempts(prev => prev + 1);
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
      // Next lesson in same module
      navigate(`/module/${moduleId}/lesson/${module.lessons[currentIndex + 1].id}`);
    } else {
      // Find next module
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
      // Find prev module
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

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 h-16 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            title="Voltar ao início"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <List size={20} />
            </button>
            
            <div className="flex flex-col">
              <span className="font-bold text-sm md:text-lg leading-tight">{lesson.title}</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
                {currentModule?.title}
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">Lição {currentModule?.lessons.findIndex(l => l.id === lesson.id)! + 1} de {currentModule?.lessons.length}</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevLesson}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors disabled:opacity-30"
            disabled={!moduleId || !lessonId} // Add real logic check if needed
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="hidden md:flex items-center gap-1 px-2">
            {currentModule?.lessons.map((l, idx) => (
              <div 
                key={l.id}
                className={clsx(
                  "w-2 h-2 rounded-full transition-colors",
                  l.id === lesson.id ? "bg-blue-600 dark:bg-blue-400 scale-125" :
                  completedLessons.includes(l.id) ? "bg-emerald-500 dark:bg-emerald-400" :
                  "bg-slate-200 dark:bg-slate-700"
                )}
                title={l.title}
              />
            ))}
          </div>

          <button
            onClick={handleNextLesson}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Lesson Navigation Sidebar (Mobile/Desktop Toggle) */}
        <div className={clsx(
          "absolute inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out shadow-xl",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white">Conteúdo do Módulo</h3>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
              <ChevronLeft size={16} />
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
        <aside className="w-1/3 min-w-[350px] max-w-[500px] flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto z-10 shadow-lg">
          <div className="p-8 pb-20">
            <div className="prose prose-slate dark:prose-invert prose-sm md:prose-base max-w-none mb-8">
              <ReactMarkdown 
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-700" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-6 mb-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-4 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4" {...props} />,
                  code: ({node, className, children, ...props}) => {
                    const match = /language-(\w+)/.exec(className || '')
                    return !className?.includes('language-') ? (
                      <code className="bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                  pre: ({node, ...props}) => (
                    <pre className="bg-slate-900 text-slate-50 p-4 rounded-xl overflow-x-auto mb-6 border border-slate-800 shadow-sm" {...props} />
                  ),
                  ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 space-y-1 text-slate-600 dark:text-slate-300 mb-4" {...props} />,
                  li: ({node, ...props}) => <li className="pl-1" {...props} />,
                }}
              >
                {lesson.content}
              </ReactMarkdown>
            </div>

            {/* Challenge Box */}
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl p-6 relative overflow-hidden shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider">
                <span className="material-symbols-outlined text-lg">flag</span>
                Desafio
              </h3>
              <p className="text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {lesson.description}
              </p>
              
              <div className="mt-6 pt-4 border-t border-blue-100 dark:border-blue-800/50">
                <button 
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
                >
                  <HelpCircle size={14} />
                  {showHint ? 'Esconder Dica' : 'Preciso de uma dica'}
                </button>
                
                {showHint && (
                  <div className="mt-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-sm rounded-lg border border-yellow-100 dark:border-yellow-800/50 animate-in fade-in slide-in-from-top-2">
                    <span className="font-bold mr-1">Dica:</span> {lesson.hint}
                  </div>
                )}
                
                {attempts >= 3 && (
                  <button 
                    onClick={handleShowSolution}
                    className="mt-4 w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg border border-red-100 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Mostrar Resposta</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Panel: Editor & Results */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-900">
          {/* Editor Area */}
          <div className="flex-1 min-h-[40%] relative">
            <SqlEditor 
              initialValue={code} 
              onChange={(val) => setCode(val || '')} 
              onRun={handleRun}
              isRunning={isRunning}
            />
          </div>

          {/* Results Area */}
          <div className="flex-1 min-h-[40%] bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 relative">
            <ResultTable data={result} error={error} loading={isRunning} />

            {/* Success Overlay */}
            {isSuccess && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20 animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="bg-emerald-50 dark:bg-emerald-900/90 backdrop-blur-md border border-emerald-200 dark:border-emerald-500/50 shadow-2xl rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500 rounded-full p-1 text-white shadow-sm">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-100">Parabéns! Desafio concluído</h4>
                      <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-0.5">+50 XP ganhos</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleNextLesson}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap flex items-center gap-1"
                  >
                    Próxima Lição
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
