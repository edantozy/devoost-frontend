import { Routes, Route, Navigate } from "react-router-dom";
import { ResetPasswordPage, LoginPage, RegisterPage } from "@pages/.";
import { useAppSelector } from "@redux/store";

export function AuthRoutes() {
  const { token } = useAppSelector((state) => state.auth);

  if (token) {
    return <Navigate to="/app" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}
