import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { login as loginService } from "../services/authService"; // Import the login service

// Define the AuthContext type
interface AuthContextType {
  user: any; // Replace 'any' with your user type
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: async () => {},
  getToken: async () => null,
});

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null); // Replace 'any' with your user type
  const [token, setToken] = useState<string | null>(null); // Initialize as string | null

  useEffect(() => {
    const loadStoredData = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    };
    loadStoredData();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const userData = await loginService(username, password);
      setUser(userData.user);
      setToken(userData.token);
      await AsyncStorage.setItem("user", JSON.stringify(userData.user));
      await SecureStore.setItemAsync("token", userData.token);
      console.log("in context");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("user");
    await SecureStore.deleteItemAsync("token");
  };

  const getToken = async () => {
    return await SecureStore.getItemAsync("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
