// src/components/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function RequireAuth({ children }) {
  const { currentProfile } = useAuth();
  const location = useLocation();

  if (!currentProfile) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
}