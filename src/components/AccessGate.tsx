"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "coloring-access-token";

interface AccessGateProps {
  children: React.ReactNode;
}

export default function AccessGate({ children }: AccessGateProps) {
  const [code, setCode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      verifyCode(saved).then((valid) => {
        if (valid) setAuthenticated(true);
        setChecking(false);
      });
    } else {
      setChecking(false);
    }
  }, []);

  async function verifyCode(accessCode: string): Promise<boolean> {
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: accessCode }),
      });
      const data = await res.json();
      return data.valid === true;
    } catch {
      return false;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const valid = await verifyCode(code);
    if (valid) {
      sessionStorage.setItem(STORAGE_KEY, code);
      setAuthenticated(true);
    } else {
      setError("Invalid access code");
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-violet-600">
              Coloring Sheet Generator
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Enter the access code to continue
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Access code"
              className="w-full p-4 rounded-2xl border-3 border-gray-200 bg-white text-gray-700 placeholder-gray-300 focus:border-violet-500 focus:outline-none text-center text-lg tracking-widest"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm text-center font-bold">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={!code}
              className="w-full py-4 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 disabled:opacity-50 text-white font-black text-lg rounded-2xl shadow-lg transition-all"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
