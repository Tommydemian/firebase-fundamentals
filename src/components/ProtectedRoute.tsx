import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Types
import { AuthInfo } from '../types/index';

type Props = {
  route: React.ReactNode
} 

export const ProtectedRoute: React.FC<Props> = ({ route }) => {
    const navigate = useNavigate();
    
    const rawAuthData = localStorage.getItem('auth');
    const authObject: AuthInfo | null = rawAuthData ? JSON.parse(rawAuthData) : null;

    useEffect(() => {
        if (!authObject || !authObject.isAuth) {
          navigate('/');
        }
      }, [authObject, navigate]);

    if (authObject && authObject.isAuth) {
        return  <>{route}</>;
    } else {
        null;
    }
};
