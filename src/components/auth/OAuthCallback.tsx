import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state) {
      // Handle OAuth callback logic here
      // You can exchange the code for a token on your backend
      console.log('OAuth callback - code:', code, 'state:', state);
      // For now, redirect to quantity page if authenticated
      if (user) {
        navigate('/quantity');
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [searchParams, user, navigate]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Processing login...</h2>
    </div>
  );
};
