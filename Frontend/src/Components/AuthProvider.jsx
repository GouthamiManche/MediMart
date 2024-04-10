import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticate, setAuthenticate] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      const decodeToken = jwtDecode(storedToken);
      const expireTime = decodeToken.exp;
      const expirationDate = new Date(expireTime * 1000);
      const currentTime = Date.now();

      if (expirationDate < currentTime) {
        console.log('Token is expired!');
        logout();
      } else {
        // Token is valid
        console.log('Token is valid');
        setAuthenticate(true);
        setUser(decodeToken); // Assuming user is stored in the token
        setToken(storedToken);
      }
    }
  }, []);

  const login = (data) => {
    setAuthenticate(true);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setAuthenticate(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(()=>{
    //console.log("user",user);
  })

  return (
    <AuthContext.Provider value={{ isAuthenticate, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };