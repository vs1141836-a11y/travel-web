import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user session is valid on mount
  useEffect(() => {
    const checkAuthSession = async () => {
      try {
        // Trigger a refresh call to check if refreshToken exists and is valid
        const response = await api.post("/auth/refresh");
        if (response.data?.success) {
          setUser(response.data.user);
        }
      } catch (err) {
        // Safe to ignore on mount, user simply isn't logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthSession();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data?.success) {
        setUser(response.data.user);
        return response.data;
      }
      throw new Error(response.data?.message || "Login failed");
    } catch (err) {
      throw err.response?.data || err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/register", { name, email, password });
      if (response.data?.success) {
        setUser(response.data.user);
        return response.data;
      }
      throw new Error(response.data?.message || "Registration failed");
    } catch (err) {
      throw err.response?.data || err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
