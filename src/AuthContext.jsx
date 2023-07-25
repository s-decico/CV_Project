import React, { createContext, useState, useEffect } from "react";
import cookie from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = cookie.get("token");
    axios
      .post(
        "http://localhost:3001/validateToken",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) setIsAuthenticated(!!token);
        else setIsAuthenticated(!token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
