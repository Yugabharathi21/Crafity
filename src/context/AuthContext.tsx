import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Provider } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface UserProfile {
  id: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  is_artisan: boolean;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string, profile: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  signInWithProvider: (provider: Provider) => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
    }
  };

  const signIn = async (email: string, password: string, rememberMe = false) => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          persistSession: rememberMe,
        },
      });
      if (error) throw error;
      toast.success('Successfully logged in!');
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, profileData: Partial<UserProfile>) => {
    try {
      setError(null);
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (signUpError) throw signUpError;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              ...profileData,
              created_at: new Date().toISOString(),
            },
          ]);

        if (profileError) throw profileError;
      }

      toast.success('Registration successful! Please check your email for verification.');
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Successfully logged out!');
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      toast.success('Password reset instructions sent to your email!');
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
      throw error;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      toast.success('Password updated successfully!');
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
      throw error;
    }
  };

  const signInWithProvider = async (provider: Provider) => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
      throw error;
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    try {
      setError(null);
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);

      if (error) throw error;
      await fetchProfile(user.id);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    signInWithProvider,
    updateProfile,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};