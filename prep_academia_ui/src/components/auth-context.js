import { useState } from "react";
import React from "react";
import axiosInstance from "../axios";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return ( 
     <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
    )
};

export {AuthProvider, AuthContext}