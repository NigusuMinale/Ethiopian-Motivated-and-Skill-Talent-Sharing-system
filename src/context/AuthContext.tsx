import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  clearError: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("emsts_token");
      if (token) {
        api.setToken(token);
        const result = await api.getProfile();
        if (result.data?.user) {
          // Map backend role to frontend display
          const backendUser = result.data.user;
          const displayRole = backendUser.role === "job_seeker" ? "jobseeker" : backendUser.role;
          setUser({ ...backendUser, role: displayRole });
        } else {
          localStorage.removeItem("emsts_token");
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = useCallback(async (email: string, password: string, _role: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    const result = await api.login(email, password);
    
    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return false;
    }

    if (result.data) {
      api.setToken(result.data.token);
      // Map backend role to frontend display
      const backendUser = result.data.user;
      const displayRole = backendUser.role === "job_seeker" ? "jobseeker" : backendUser.role;
      const displayUser = { ...backendUser, role: displayRole };
      setUser(displayUser);
      localStorage.setItem("emsts_user", JSON.stringify(displayUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    const result = await api.register(name, email, password, role);
    
    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return false;
    }

    if (result.data) {
      api.setToken(result.data.token);
      // Map backend role to frontend display
      const backendUser = result.data.user;
      const displayRole = backendUser.role === "job_seeker" ? "jobseeker" : backendUser.role;
      const displayUser = { ...backendUser, role: displayRole };
      setUser(displayUser);
      localStorage.setItem("emsts_user", JSON.stringify(displayUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    api.setToken(null);
    setUser(null);
    localStorage.removeItem("emsts_token");
    localStorage.removeItem("emsts_user");
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn: !!user, 
      isLoading,
      error,
      login, 
      register, 
      logout,
      clearError 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
