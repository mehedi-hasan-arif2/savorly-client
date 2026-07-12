"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { AuthUser } from "@/types";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
      toast.success(`Welcome back, ${res.data.user.name}`);
      return { success: true };
    } catch (err) {
      const message = axiosError(err);
      toast.error(message);
      return { success: false, error: message };
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      setUser(res.data.user);
      toast.success("Account created");
      return { success: true };
    } catch (err) {
      const message = axiosError(err);
      toast.error(message);
      return { success: false, error: message };
    }
  }

  async function logout() {
    await api.post("/auth/logout");
    setUser(null);
    toast.success("Logged out");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function axiosError(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const response = (err as { response?: { data?: { error?: string } } }).response;
    return response?.data?.error || "Something went wrong";
  }
  return "Something went wrong";
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
