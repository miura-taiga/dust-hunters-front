"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { Settings } from "@/config";

const LoginPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { setToken } = useAuth();

  useEffect(() => {
    setIsClient(true);
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setToken(token);
      localStorage.setItem("auth", token);
    }
  }, [setToken]);

  const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = document.createElement("form");
    form.method = "GET";
    form.action = `${Settings.API_URL}/auth/google_oauth2`;
    document.body.appendChild(form);
    form.submit();
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="space-y-4">
        <button className="btn btn-accent gap-2 w-full" onClick={handleGoogleAuth}>
          Googleログイン
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
