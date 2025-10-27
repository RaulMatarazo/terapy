import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import PrivateRoute from "./routes/PrivateRoutes";
import { useAuth } from "./auth/AuthContext";

function App() {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated === undefined) return null;

  return (
    <Routes>

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>

      <Route path="/auth/*" element={<Auth />} />

      <Route
        path="*"
        element={
          isAuthenticated ? (
            role === "psicologo"
              ? <Navigate to="/dashboard/home" replace />
              : <Navigate to="/dashboard/questionario" replace />
          ) : (
            <Navigate to="/auth/sign-in" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
