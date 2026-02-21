import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Database, Github, Code2, BarChart3, Trophy, Sparkles } from 'lucide-react';

export function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signIn();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-4">
      {/* Decorative blobs */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-violet-200/20 dark:bg-violet-500/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-500/5 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none" />

      {/* Hero content */}
      <div className="max-w-md w-full relative z-10">
        {/* Logo and title */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-violet-500 to-indigo-600 p-4 rounded-2xl text-white mb-4 shadow-xl shadow-violet-500/25">
            <Database size={40} />
          </div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">SQLearn</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center mt-2 text-sm max-w-xs leading-relaxed">
            Aprenda SQL do zero ao avançado com exercícios interativos, gamificação e conteúdo 100% em português.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="flex flex-col items-center text-center p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
            <Code2 size={22} className="text-violet-500 mb-2" />
            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">Editor SQL Interativo</span>
          </div>
          <div className="flex flex-col items-center text-center p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
            <BarChart3 size={22} className="text-emerald-500 mb-2" />
            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">30+ Exercícios Práticos</span>
          </div>
          <div className="flex flex-col items-center text-center p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
            <Trophy size={22} className="text-amber-500 mb-2" />
            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">XP, Níveis e Conquistas</span>
          </div>
        </div>

        {/* Login card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none p-6 border border-slate-200/80 dark:border-slate-700">
          <div className="space-y-3">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-white py-3 px-4 rounded-xl font-semibold transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 dark:border-slate-900/30 border-t-white dark:border-t-slate-900 rounded-full animate-spin" />
              ) : (
                <Github size={18} />
              )}
              <span>Entrar com GitHub</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white dark:bg-slate-800 text-slate-400">ou</span>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/25 text-sm flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              Começar Agora (Demo)
            </button>
          </div>

          <p className="mt-6 text-center text-[10px] text-slate-400 leading-relaxed">
            Nenhum cadastro necessário para a demonstração. Seus dados ficam salvos no navegador.
          </p>
        </div>
      </div>
    </div>
  );
}
