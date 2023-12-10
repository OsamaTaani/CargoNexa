import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));
  // const [isRegistered, setIsRegistered] = useState(!!Cookies.get("token"));
  // const [headers, setHeaders] = useState([]);
  const [authToken, setAuthToken] = useState(Cookies.get("token") || null);
  const [userRole, setUserRole] = useState(undefined);

  const login = (token) => {
    setAuthToken(token);
    Cookies.set("token", token)
    setUserRole(1)
  };

  const loginDriver = (token) => {
    setAuthToken(token);
    Cookies.set("token", token)
    setUserRole(2)
  };
  const register = (token) => {
    setAuthToken(token);
    Cookies.set("token", token)
    setUserRole(1)

  };
  const registerForDriver = (token) => {
    setAuthToken(token);
    Cookies.set("token", token)
    setUserRole(2)

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
    return userRole;

  }


  return (
    <AuthContext.Provider value={{ authToken, login, isUserRole,loginDriver, logout,register,registerForDriver, isAuthenticated }}>
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