import { useAppSelector } from "@redux/store";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.auth);

  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
