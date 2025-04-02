import React from 'react';
import { useAuth } from '../hooks/useAuth';

export function Welcome() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  return (
    <div>
      Welcome {user.email}
    </div>
  );
}