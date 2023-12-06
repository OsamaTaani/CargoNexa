import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));
  // const [isRegistered, setIsRegistered] = useState(!!Cookies.get("token"));
  // const [headers, setHeaders] = useState([]);
  const [authToken, setAuthToken] = useState(Cookies.get("token") || null);
  
  const login = (token) => {
    setAuthToken(token);
    Cookies.set("token", token)
  };
  // const register = (Token) => {
  //   setIsRegistered(true);
  //   setHeaders({ token: Token });
  // };

  const logout = () => {
    setAuthToken(null);
    console.log(authToken);
    Cookies.remove("token");
  };

  const isAuthenticated = () => {
    return !!authToken;

  }
  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

  // useEffect(() => {
  //   setIsLoggedIn(!!Cookies.get("token"));
  //   setIsRegistered(!!Cookies.get("token"));
    
  // }, []);

  // return (
  //   <AuthContext.Provider
  //     value={{ isRegistered, isLoggedIn, login, register, logout, headers }}
  //   >
  //     {children}
  //   </AuthContext.Provider>
  // );
// };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};