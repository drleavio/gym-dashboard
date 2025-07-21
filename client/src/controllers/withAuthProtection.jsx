import React from "react";
import { Navigate } from "react-router-dom";


const withAuthProtection = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    const isAuthenticated = localStorage.getItem("token"); 

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuthProtection;
