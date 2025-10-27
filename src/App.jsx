import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import PrivateRoute from "./routes/PrivateRoutes";

function App() {
  return (
    <Routes>
      {/* bloco protegido */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>

      {/* público */}
      <Route path="/auth/*" element={<Auth />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
