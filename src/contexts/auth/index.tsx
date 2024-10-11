'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { Settings } from '@/config';
import { AuthContextType, JwtPayload } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const getTokenFromStorageOrUrl = () => {
  const query = new URLSearchParams(window.location.search);
  const tokenFromUrl = query.get('token');

  if (tokenFromUrl) {
    console.log('Token from URL:', tokenFromUrl);
    return tokenFromUrl;
  }

  const storedToken = localStorage.getItem('authToken');
  console.log('Token from localStorage:', storedToken);
  return storedToken || null;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [googleUserId, setGoogleUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const logout = useCallback(() => {
    setGoogleUserId(null);
    setTokenState(null);
    setCurrentUser(null);
    localStorage.removeItem('authToken');
    router.push('/login');
  }, [router]);

  useEffect(() => {
    const token = getTokenFromStorageOrUrl();

    if (token) {
      setTokenState(token);
      localStorage.setItem('authToken', token);

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log('Decoded token:', decoded);
        setGoogleUserId(decoded.google_user_id);

        fetch(`${Settings.API_URL}/api/v1/users/current`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch user');
            }
            return response.json();
          })
          .then((data) => {
            console.log('Fetched user data:', data);
            setCurrentUser(data.user);
          })
          .catch((error) => {
            console.error('Error fetching user:', error);
            logout();
          });
      } catch (error) {
        console.error('Invalid token', error);
        logout();
      }
    }

    setIsCheckingToken(false);
  }, [logout]);

  useEffect(() => {
    const publicPaths = '/';
    if (!isCheckingToken && !token && !publicPaths.includes(pathname)) {
      router.push('/?flash=warning&message=ログインが必要です。');
    }
  }, [token, pathname, isCheckingToken, router]);

  const setToken = (token: string) => {
    setTokenState(token);
    localStorage.setItem('authToken', token);
  };

  return (
    <AuthContext.Provider
      value={{ token, googleUserId, currentUser, setToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
