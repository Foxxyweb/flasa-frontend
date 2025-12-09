// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../auth";

export default function AdminRoute({ children }) {
  if (!isAuthenticated()) {
    localStorage.setItem("redirectAfterLogin", "/admin");
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
