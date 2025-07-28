import React, { useEffect, createContext, useContext, useState } from "react";
import axios from "axios";

const authContext = createContext();
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setUser(null);
        setToken(null);
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (res.data.success) {
          setUser(res.data.user);
          setToken(storedToken);
        } else {
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        setUser(null);
        setToken(null);
        console.log(error.message);
      }
    };
    verifyUser();
  }, []);

  return (
    <authContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export default ContextProvider;
