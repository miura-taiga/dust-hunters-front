"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const getTokenFromStorageOrUrl = () => {
  const query = new URLSearchParams(window.location.search);
  const tokenFromUrl = query.get("token");

  if (tokenFromUrl) {
    localStorage.setItem("authToken", tokenFromUrl);
    return tokenFromUrl;
  }

  const storedToken = localStorage.getItem("authToken");
  return storedToken || null;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getTokenFromStorageOrUrl();
    setTokenState(token);
    setIsCheckingToken(false);
  }, []);

  useEffect(() => {
    const publicPaths = ["/login", "/top"];
    if (!isCheckingToken && !token && !publicPaths.includes(pathname)) {
      router.push("/login");
    }
  }, [token, pathname, isCheckingToken, router]);

  const setToken = (token: string) => {
    setTokenState(token);
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
