import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "individual" | "company" | "jobseeker";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, role: string) => boolean;
  register: (name: string, email: string, password: string, role: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => false,
  register: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("emsts_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
  }, []);

  const login = (email: string, _password: string, role: string) => {
    const u: User = {
      id: "u_" + Date.now(),
      name: email.split("@")[0],
      email,
      role: role as any,
      avatar: undefined,
    };
    setUser(u);
    localStorage.setItem("emsts_user", JSON.stringify(u));
    return true;
  };

  const register = (name: string, email: string, _password: string, role: string) => {
    const u: User = {
      id: "u_" + Date.now(),
      name,
      email,
      role: role as any,
    };
    setUser(u);
    localStorage.setItem("emsts_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("emsts_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
