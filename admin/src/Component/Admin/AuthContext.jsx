import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get("token") || null);
  const [userRole, setUserRole] = useState(undefined);

  const login = (token) => {
    setAuthToken(token);
    Cookies.set("token", token)
    setUserRole(3)
  };

  const logout = () => {
    setAuthToken(null);
    console.log(authToken);
    Cookies.remove("token");
    Cookies.remove("role");
    sessionStorage.removeItem("role");
    window.location.href = "/";
    };

  const isAuthenticated = () => {
    return !!authToken;
  }

  const isUserRole = () => {
    console.log(userRole);

    return userRole;
  }

  return (
    <AuthContext.Provider value={{ authToken, login, isUserRole, logout, isAuthenticated }}>
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