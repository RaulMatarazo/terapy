import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated === undefined) {
    return null; // ou spinner
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/sign-in" state={{ from: location }} replace />
  );
}

export default PrivateRoute;
