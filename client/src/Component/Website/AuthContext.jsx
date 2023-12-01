import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));
  const [isRegistered, setIsRegistered] = useState(!!Cookies.get("token"));
  const [headers, setHeaders] = useState([]);

  const login = (Token) => {
    setIsLoggedIn(true);
    setHeaders({ token: Token });
  };
  const register = (Token) => {
    setIsRegistered(true);
    setHeaders({ token: Token });
  };

  const logout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    window.location.reload();

  };

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get("token"));
    setIsRegistered(!!Cookies.get("token"));
  }, []);

  return (
    <AuthContext.Provider
      value={{ isRegistered, isLoggedIn, login, register, logout, headers }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
