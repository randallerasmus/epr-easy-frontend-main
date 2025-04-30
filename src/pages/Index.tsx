
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEprStore } from '@/store/useEprStore';
import Login from './Login';

const Index: React.FC = () => {
  const { isAuthenticated } = useEprStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return <Login />;
};

export default Index;
