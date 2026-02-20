import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Database, Github } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-4 rounded-2xl text-white mb-4 shadow-lg shadow-blue-500/30">
            <Database size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">SQL Academy</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center mt-2">
            Aprenda SQL na prática com exercícios interativos e gamificação.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-semibold transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">sync</span>
            ) : (
              <Github size={20} />
            )}
            <span>Entrar com GitHub</span>
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">ou continue como convidado</span>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            Acessar Demonstração
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Ao entrar, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  );
}
