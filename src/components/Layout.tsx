import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/contexts/GamificationContext';
import { 
  Database, 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import clsx from 'clsx';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const { level, xp } = useGamification();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Início', href: '/' },
    { icon: BookOpen, label: 'Módulos', href: '/#modules' },
    { icon: Trophy, label: 'Ranking', href: '/leaderboard' },
    { icon: Settings, label: 'Configurações', href: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex md:flex-col",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-700">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Database size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg">SQL Academy</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Aprenda na prática</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                location.pathname === item.href 
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          {user ? (
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.name}`} 
                alt={user.name} 
                className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-600"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{user.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Nível {level} • {xp} XP</p>
              </div>
            </div>
          ) : (
            <Link to="/login" className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
              Entrar
            </Link>
          )}
          
          {user && (
            <button 
              onClick={signOut}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span>Sair</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative w-full">
        {children}
      </main>
    </div>
  );
}
