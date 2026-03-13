import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function RequireAuth({ children }) {
  const { currentProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="container py-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (!currentProfile) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
}