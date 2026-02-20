import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/contexts/GamificationContext';
import {
  Database,
  LayoutDashboard,
  Trophy,
  Settings,
  LogOut,
  Menu,
  X,
  Flame
} from 'lucide-react';
import clsx from 'clsx';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const { level, levelTitle, xp, streak } = useGamification();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Início', href: '/' },
    { icon: Trophy, label: 'Ranking', href: '/leaderboard' },
    { icon: Settings, label: 'Configurações', href: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex md:flex-col",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-5 flex items-center gap-3 border-b border-slate-100 dark:border-slate-700">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Database size={22} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">SQLearn</h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Aprenda SQL na prática</p>
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
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm",
                location.pathname === item.href
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Streak display */}
          {streak > 0 && (
            <div className="mt-4 mx-2 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30">
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

        {/* User card */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          {user ? (
            <div className="flex items-center gap-3 mb-3">
              <img
                src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.name}&background=3b82f6&color=fff`}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-600"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{user.name}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  Nível {level} · {levelTitle} · {xp} XP
                </p>
              </div>
            </div>
          ) : (
            <Link to="/login" className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3 text-sm">
              Entrar
            </Link>
          )}

          {user && (
            <button
              onClick={signOut}
              className="flex items-center gap-2 w-full px-4 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
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
