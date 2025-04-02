import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setState(prev => ({ ...prev, user: session?.user ?? null }));
      } catch (err) {
        setState(prev => ({ ...prev, error: err instanceof Error ? err.message : 'Auth error' }));
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    getSession();

    const { data: { subscription }} = supabase.auth.onAuthStateChange((_event, session) => {
      setState(prev => ({ ...prev, user: session?.user ?? null }));
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}
