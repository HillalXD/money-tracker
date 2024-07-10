<<<<<<< HEAD
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const loginURL = "http://localhost:3030/authentication/login"

    const login = async (userInput) => {
        const response = await axios.post(loginURL, userInput, { withCredentials: true})
        console.log(response)
        setCurrentUser(response.data)
    };

    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
          {children}
        </AuthContext.Provider>
      );
}
=======
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  console.log(user);

  const login = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/authentication/profile",
        { withCredentials: true }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [login]);

  return (
    <AuthContext.Provider value={{ user, login, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
>>>>>>> d08f619 (mongodb migrate and google oauth)
