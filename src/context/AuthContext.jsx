// src/context/AuthContext.jsx
// ✅ FIXED: Fetches fresh user data from server on mount.
// This solves the core bug: alumni logs in → admin approves them → 
// alumniUser in localStorage still has isApproved:false → ProtectedRoute blocks them.
// Now on every page load, we re-fetch /auth/profile to get the latest approval status.

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Seed from localStorage so there's no flash on reload
    try { return JSON.parse(localStorage.getItem("alumniUser")); }
    catch { return null; }
  });
  const [authLoading, setAuthLoading] = useState(true);

  // ── On mount: verify token + refresh user from server ──────────
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setAuthLoading(false);
      return;
    }

    fetch(`${API_BASE}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        const freshUser = data?.alumni ?? data?.user ?? data ?? null;
        if (freshUser) {
          localStorage.setItem("alumniUser", JSON.stringify(freshUser));
          setUser(freshUser);
        } else {
          throw new Error("No user in response");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("alumniUser");
        setUser(null);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  const login = useCallback((userData, token) => {
    localStorage.setItem("alumniUser", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("alumniUser");
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      const freshUser = data?.alumni ?? data?.user ?? data ?? null;
      if (freshUser) {
        localStorage.setItem("alumniUser", JSON.stringify(freshUser));
        setUser(freshUser);
      }
    } catch {
      logout();
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}