import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Database, Github, Code2, BarChart3, Trophy } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4">
      {/* Hero content */}
      <div className="max-w-md w-full">
        {/* Logo and title */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-4 rounded-2xl text-white mb-4 shadow-lg shadow-blue-500/30">
            <Database size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">SQLearn</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center mt-2 text-sm max-w-xs leading-relaxed">
            Aprenda SQL do zero ao avançado com exercícios interativos, gamificação e conteúdo 100% em português.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
            <Code2 size={20} className="text-blue-500 mb-1.5" />
            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">Editor SQL Interativo</span>
          </div>
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
            <BarChart3 size={20} className="text-emerald-500 mb-1.5" />
            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">30+ Exercícios Práticos</span>
          </div>
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
            <Trophy size={20} className="text-yellow-500 mb-1.5" />
            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">XP, Níveis e Conquistas</span>
          </div>
        </div>

        {/* Login card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="space-y-3">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-white py-3 px-4 rounded-xl font-semibold transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
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
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm"
            >
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
