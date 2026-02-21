import React from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/contexts/GamificationContext';
import { Trophy, Medal, Crown } from 'lucide-react';
import clsx from 'clsx';

type LeaderboardUser = {
  id: string;
  name: string;
  avatar_url?: string;
  xp: number;
  level: number;
  rank: number;
};

export function Leaderboard() {
  const { user } = useAuth();
  const { xp, level } = useGamification();

  // Mock data for leaderboard
  const [users, setUsers] = React.useState<LeaderboardUser[]>([
    { id: 'u-1', name: 'Ana Silva', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', xp: 15400, level: 42, rank: 1 },
    { id: 'u-2', name: 'Carlos Souza', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', xp: 12300, level: 35, rank: 2 },
    { id: 'u-3', name: 'Beatriz Lima', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz', xp: 9800, level: 28, rank: 3 },
    { id: 'u-4', name: 'Daniel Costa', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel', xp: 8500, level: 25, rank: 4 },
    { id: 'u-5', name: 'Eduardo Pereira', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eduardo', xp: 7200, level: 22, rank: 5 },
  ]);

  // Add current user to the list if not already there (mock logic)
  // In a real app, this would come from the backend sorted by XP
  const currentUserRank = {
    id: user?.id || 'me',
    name: user?.name || 'Você',
    avatar_url: user?.avatar_url,
    xp,
    level,
    rank: 0 // Will be calculated
  };

  // Combine and sort
  const allUsers = [...users];
  // Check if user is already in the list (mock check by ID, though IDs are different in mock)
  // For demo purposes, let's just add the user to the list and sort
  if (!allUsers.find(u => u.id === user?.id)) {
    allUsers.push(currentUserRank);
  }

  const sortedUsers = allUsers.sort((a, b) => b.xp - a.xp).map((u, index) => ({ ...u, rank: index + 1 }));

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <Trophy className="text-yellow-500" size={32} />
            Ranking Global
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Veja quem são os mestres do SQL esta semana.
          </p>
        </header>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-sm border border-blue-100 dark:border-slate-700 overflow-hidden">
          {/* Top 3 Podium (Visual) - Optional, maybe for later. Let's stick to a list first. */}
          
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {sortedUsers.map((u) => {
              const isCurrentUser = u.id === user?.id || (u.id === 'me' && !user?.id); // Fallback for mock
              
              return (
                <div 
                  key={u.id} 
                  className={clsx(
                    "flex items-center gap-4 p-4 transition-colors",
                    isCurrentUser ? "bg-blue-50 dark:bg-violet-900/20" : "hover:bg-blue-50/30 dark:hover:bg-slate-700/30"
                  )}
                >
                  <div className="w-8 text-center font-bold text-slate-500 dark:text-slate-400">
                    {u.rank === 1 ? <Crown size={24} className="text-yellow-500 mx-auto" /> : 
                     u.rank === 2 ? <Medal size={24} className="text-slate-400 mx-auto" /> :
                     u.rank === 3 ? <Medal size={24} className="text-amber-600 mx-auto" /> :
                     `#${u.rank}`}
                  </div>
                  
                  <img 
                    src={u.avatar_url || `https://ui-avatars.com/api/?name=${u.name}`} 
                    alt={u.name} 
                    className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-600"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <p className={clsx("font-bold truncate", isCurrentUser ? "text-blue-700 dark:text-violet-400" : "text-slate-900 dark:text-white")}>
                      {u.name} {isCurrentUser && "(Você)"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Nível {u.level}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-slate-900 dark:text-white">{u.xp.toLocaleString()}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">XP</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
