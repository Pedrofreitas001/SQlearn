import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { GamificationProvider } from '@/contexts/GamificationContext';
import { Dashboard } from '@/pages/Dashboard';
import { Lesson } from '@/pages/Lesson';
import { Login } from '@/pages/Login';
import { Leaderboard } from '@/pages/Leaderboard';
import { Settings } from '@/pages/Settings';
import { Content } from '@/pages/Content';

import { ModuleRedirect } from '@/components/ModuleRedirect';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-violet-200 border-t-violet-600"></div>
        <span className="text-sm text-slate-400 font-medium">Carregando...</span>
      </div>
    </div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}

import { ThemeProvider } from '@/contexts/ThemeContext';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <GamificationProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              
              <Route path="/leaderboard" element={
                <PrivateRoute>
                  <Leaderboard />
                </PrivateRoute>
              } />
              
              <Route path="/settings" element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } />
              
              <Route path="/content" element={
                <PrivateRoute>
                  <Content />
                </PrivateRoute>
              } />

              <Route path="/module/:moduleId/lesson/:lessonId" element={
                <PrivateRoute>
                  <Lesson />
                </PrivateRoute>
              } />
              
              <Route path="/module/:moduleId" element={
                <PrivateRoute>
                  <ModuleRedirect />
                </PrivateRoute>
              } />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </GamificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
