"use client";

import React from "react";
import { useAuth } from "@/contexts/auth";
import { Settings } from "@/config";

const LoginButton: React.FC = () => {
  const { setToken } = useAuth();

  const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = document.createElement("form");
    form.method = "GET";
    form.action = `${Settings.API_URL}/auth/google_oauth2`;
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <button className="btn btn-accent gap-2 w-full" onClick={handleGoogleAuth}>
      Googleログイン
    </button>
  );
};

export default LoginButton;
