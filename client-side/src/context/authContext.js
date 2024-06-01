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