import { createContext, useEffect, useState,useContext,useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [formData, setFormData] = useState({
            email: "",
            phone: "",
            password: "",
            otp:['', '', '', ''],
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const setTokenState = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    const contextValue = useMemo(() => ({
        token,
        setTokenState,
        logout,
        formData,
        setFormData
      }), [token, formData]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);