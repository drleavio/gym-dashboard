import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/useStore";



const withAuthProtection = (WrappedComponent) => {
    const ProtectedComponent = (props) => {
        const { token } = useAuth()
        const isAuthenticated = token;

        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }
        return <WrappedComponent {...props} />;
    };

    return ProtectedComponent;
};

export default withAuthProtection;
