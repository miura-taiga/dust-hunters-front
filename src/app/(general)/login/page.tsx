"use client";

import React, { useEffect, useState } from "react";
import { WarningMessage } from "@/components/layouts/messages";
import { useAuth } from "@/contexts/auth";
import { Settings } from "@/config";

const LoginPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const { setToken } = useAuth();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    setIsClient(true);
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  useEffect(() => {
    if (searchParams) {
      const token = searchParams.get("token");
      const flash = searchParams.get("flash");
      const message = searchParams.get("message");

      if (token) {
        setToken(token);
        localStorage.setItem("auth", token);
      }

      if (flash === "warning" && message) {
        setMessage(message);
        setShowMessage(true);
      }
    }
  }, [searchParams, setToken]);

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
      {/* フラッシュメッセージ表示 */}
      {showMessage && (
        <WarningMessage
          message={message}
          onClose={() => setShowMessage(false)}
        />
      )}

      <div className="space-y-4">
        <button className="btn btn-accent gap-2 w-full" onClick={handleGoogleAuth}>
          Googleログイン
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
