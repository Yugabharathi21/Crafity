import React from 'react';
import { useAuth } from '../hooks/useAuth';

export function AuthStatus() {
  const { user, loading, error } = useAuth();

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!user) {
    return <div className="text-center p-4">Please sign in</div>;
  }

  return (
    <div className="text-center p-4">
      Welcome {user.email}
    </div>
  );
}