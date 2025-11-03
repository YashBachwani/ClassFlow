// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children, allowedRole }) {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  if (!activeUser) {
    toast.error("Please signup or login first!");
    return <Navigate to="/signup" replace />;
  }

  if (activeUser.role !== allowedRole) {
    toast.error("Access denied! You are not authorized to view this page.");
    return <Navigate to={`/${activeUser.role}-dashboard`} replace />;
  }

  return children;
}
