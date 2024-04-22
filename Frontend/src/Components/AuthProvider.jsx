import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      const expireTime = decodedToken.exp * 1000;
      const currentTime = Date.now();

      if (expireTime < currentTime) {
        console.log('Token has expired!');
        logout();
      } else {
        console.log('Token is valid');
        setAuthenticated(true);
        setUser(decodedToken);
        setToken(storedToken);
        const userCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log('Cart items:', userCartItems);
      }
    } else {
      console.log('No token found');
    }
  }, [token]);

  const login = (data) => {
    setAuthenticated(true);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems');
    window.location.reload();
  };

useEffect(()=>{
  console.log("User : ",user);
})

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
