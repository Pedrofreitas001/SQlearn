import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGamification } from '@/contexts/GamificationContext';
import { curriculum, Lesson as LessonType } from '@/data/curriculum';
import { executeQuery } from '@/lib/db';
import { SqlEditor } from '@/components/SqlEditor';
import { ResultTable } from '@/components/ResultTable';
import { ArrowLeft, CheckCircle, XCircle, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';
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
      // Next module? Or back to dashboard
      navigate('/');
    }
  };

  if (!lesson) return null;

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 h-16 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{lesson.title}</span>
            <span className="text-slate-400 text-sm">•</span>
            <span className="text-slate-500 dark:text-slate-400 text-sm">Módulo {moduleId?.split('-')[1]}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium">Ambiente Seguro</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel: Content */}
        <aside className="w-1/3 min-w-[350px] max-w-[500px] flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto z-10 shadow-lg">
          <div className="p-6 pb-20">
            <div className="prose prose-slate dark:prose-invert prose-sm max-w-none mb-8">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>

            {/* Challenge Box */}
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl p-5 relative overflow-hidden">
              <h3 className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">
                <span className="material-symbols-outlined text-lg">flag</span>
                Desafio
              </h3>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {lesson.description}
              </p>
              
              <div className="mt-4">
                <button 
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1"
                >
                  <HelpCircle size={14} />
                  {showHint ? 'Esconder Dica' : 'Preciso de uma dica'}
                </button>
                
                {showHint && (
                  <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-xs rounded-lg border border-yellow-100 dark:border-yellow-800/50 animate-in fade-in slide-in-from-top-2">
                    💡 {lesson.hint}
                  </div>
                )}
                
                {attempts >= 3 && (
                  <button 
                    onClick={handleShowSolution}
                    className="mt-4 w-full py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg border border-red-100 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    Mostrar Resposta
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
