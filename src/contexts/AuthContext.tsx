import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type User = {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for Supabase session
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata.name || 'Usuário',
            avatar_url: session.user.user_metadata.avatar_url,
          });
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata.name || 'Usuário',
            avatar_url: session.user.user_metadata.avatar_url,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // Mock Auth for Preview
      const mockUser = {
        id: 'mock-user-1',
        email: 'dev@sqlacademy.com.br',
        name: 'Dev Aprendiz',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      };
      
      // Simulate loading
      setTimeout(() => {
        setUser(mockUser);
        setLoading(false);
      }, 500);
    }
  }, []);

  const signIn = async () => {
    if (supabase) {
      await supabase.auth.signInWithOAuth({ provider: 'github' });
    } else {
      // Mock sign in
      setUser({
        id: 'mock-user-1',
        email: 'dev@sqlacademy.com.br',
        name: 'Dev Aprendiz',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      });
    }
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
