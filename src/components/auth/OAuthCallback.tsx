import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { completeOAuthLogin } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      try {
        await completeOAuthLogin({
          accessToken: searchParams.get('accessToken') || undefined,
          tokenType: searchParams.get('tokenType') || undefined,
          expiresIn: searchParams.get('expiresIn') || undefined,
          error: searchParams.get('error') || undefined,
          message: searchParams.get('message') || undefined,
        });
        navigate('/quantity', { replace: true });
      } catch {
        navigate('/login', { replace: true });
      }
    };

    processCallback();
  }, [searchParams, completeOAuthLogin, navigate]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Processing login...</h2>
    </div>
  );
};
