import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const TestConnection: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Try to fetch a count from the profiles table
        const { count, error } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (error) throw error;
        
        // If we get here, the connection is successful
        setStatus('connected');
      } catch (err: any) {
        setStatus('error');
        setError(err.message);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 rounded-lg border">
      <h2 className="text-lg font-semibold mb-2">Database Connection Status</h2>
      
      {status === 'checking' && (
        <div className="text-blue-600">
          Checking connection...
        </div>
      )}
      
      {status === 'connected' && (
        <div className="text-green-600">
          ✓ Successfully connected to database
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-red-600">
          ✗ Connection error: {error}
        </div>
      )}
    </div>
  );
};

export default TestConnection;