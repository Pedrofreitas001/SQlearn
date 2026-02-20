import React from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Monitor, LogOut, User, Shield } from 'lucide-react';
import clsx from 'clsx';

export function Settings() {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Configurações</h1>

        <div className="space-y-6">
          {/* Profile Section */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
              <User size={20} />
              Perfil
            </h2>
            
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={user?.avatar_url || `https://ui-avatars.com/api/?name=${user?.name}`} 
                alt={user?.name} 
                className="w-16 h-16 rounded-full border-2 border-slate-200 dark:border-slate-600"
              />
              <div>
                <p className="font-bold text-lg text-slate-900 dark:text-white">{user?.name}</p>
                <p className="text-slate-500 dark:text-slate-400">{user?.email}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
              <button 
                onClick={signOut}
                className="text-red-500 hover:text-red-600 font-medium flex items-center gap-2 transition-colors"
              >
                <LogOut size={18} />
                Sair da conta
              </button>
            </div>
          </section>

          {/* Appearance Section */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
              <Monitor size={20} />
              Aparência
            </h2>
            
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTheme('light')}
                className={clsx(
                  "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all",
                  theme === 'light' 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400"
                )}
              >
                <Sun size={24} />
                <span className="text-sm font-medium">Claro</span>
              </button>
              
              <button
                onClick={() => setTheme('dark')}
                className={clsx(
                  "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all",
                  theme === 'dark' 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400"
                )}
              >
                <Moon size={24} />
                <span className="text-sm font-medium">Escuro</span>
              </button>
              
              <button
                onClick={() => setTheme('system')}
                className={clsx(
                  "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all",
                  theme === 'system' 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400"
                )}
              >
                <Monitor size={24} />
                <span className="text-sm font-medium">Sistema</span>
              </button>
            </div>
          </section>

          {/* Privacy/Data Section */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 opacity-75">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
              <Shield size={20} />
              Privacidade
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Seus dados de progresso são salvos localmente neste navegador (modo demonstração).
            </p>
            <div className="flex gap-3">
              <button disabled className="text-slate-400 text-sm font-medium cursor-not-allowed">
                Gerenciar dados (Em breve)
              </button>
              <button 
                onClick={() => {
                  if (confirm('Tem certeza? Isso apagará todo o seu progresso.')) {
                    localStorage.removeItem('sql-academy-xp');
                    localStorage.removeItem('sql-academy-lessons');
                    window.location.reload();
                  }
                }}
                className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
              >
                Resetar Progresso
              </button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
