"use client";

import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthenticated(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      setUser(userData);
     
    } else {
      setIsAuthenticated(false);
      setUser({}); //unauthenticated user
    }
  }, [Cookies]);
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
