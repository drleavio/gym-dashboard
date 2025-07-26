import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/useStore";

const withAuthProtection = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    const { token } = useAuth();
    const location = useLocation();
    const isAuthenticated = !!token;
    const guestOnlyPaths = ["/login", "/","/otp-verify"];
    if (
      isAuthenticated &&
      guestOnlyPaths.includes(location.pathname)
    ) {
      return <Navigate to="/dashboard" replace />;
    }
    if (
      !isAuthenticated &&
      !guestOnlyPaths.includes(location.pathname)
    ) {
      return <Navigate to="/login" replace />;
    }
    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuthProtection;
