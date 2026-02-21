import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/contexts/GamificationContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Database,
  LayoutDashboard,
  Trophy,
  Settings,
  LogOut,
  Menu,
  X,
  Flame,
  BookOpen,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import clsx from 'clsx';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const { level, levelTitle, xp, streak } = useGamification();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Início', href: '/' },
    { icon: BookOpen, label: 'Conteúdo', href: '/content' },
    { icon: Trophy, label: 'Ranking', href: '/leaderboard' },
    { icon: Settings, label: 'Configurações', href: '/settings' },
  ];

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex md:flex-col shadow-sm",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-5 flex items-center gap-3 border-b border-slate-100 dark:border-slate-700">
          <div className="bg-gradient-to-br from-violet-500 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-violet-500/20">
            <Database size={20} />
          </div>
          <div>
            <h1 className="font-extrabold text-lg leading-tight bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">SQLearn</h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Aprenda SQL na prática</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={clsx(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm",
                location.pathname === item.href
                  ? "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 font-semibold shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <item.icon size={18} strokeWidth={location.pathname === item.href ? 2.5 : 2} />
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Streak display */}
          {streak > 0 && (
            <div className="mt-4 mx-2 p-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30">
              <div className="flex items-center gap-2">
                <Flame className="text-orange-500" size={18} />
                <div>
                  <p className="text-xs font-bold text-orange-700 dark:text-orange-300">{streak} {streak === 1 ? 'dia' : 'dias'} seguidos</p>
                  <p className="text-[10px] text-orange-500 dark:text-orange-400">Continue assim!</p>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Theme toggle + User card */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
          {/* Quick theme toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
            <span>{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.name}&background=7c3aed&color=fff`}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-violet-100 dark:border-slate-600 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{user.name}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  <Sparkles size={10} className="text-violet-500 shrink-0" />
                  <span>Nível {level} · {xp} XP</span>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="block w-full py-2 px-4 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-center rounded-lg font-semibold hover:from-violet-600 hover:to-indigo-600 transition-all text-sm shadow-lg shadow-violet-500/20">
              Entrar
            </Link>
          )}

          {user && (
            <button
              onClick={signOut}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          )}
        </div>
      </aside>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative w-full">
        {children}
      </main>
    </div>
  );
}
