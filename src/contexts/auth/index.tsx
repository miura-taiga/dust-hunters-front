"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  currentUser: any;
  logout: () => void;
  setToken: (token: string) => void;
  setCurrentUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const tokenFromUrl = query.get("token");

    if (tokenFromUrl) {
      setTokenState(tokenFromUrl);
      localStorage.setItem("authToken", tokenFromUrl);
    } else {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setTokenState(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }
          return response.json();
        })
        .then((data) => setCurrentUser(data.user))
        .catch((error) => {
          console.error("Error fetching user:", error);
          logout();
        });
    }
  }, [token]);

  const setToken = (token: string) => {
    setTokenState(token);
  };

  const logout = () => {
    setCurrentUser(null);
    setTokenState(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ token, logout, setToken, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
