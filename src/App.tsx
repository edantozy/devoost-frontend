import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppRoutes, AuthRoutes } from "@routes/.";
import { ProtectedRoute } from "@routes/ProtectedRoute";
import { loadToken } from "@redux/thunks/authThunks";
import { useAppDispatch } from "@redux/store";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.style.scrollBehavior = "auto";
    }
    window.scroll({ top: 0 });
    if (htmlElement) {
      htmlElement.style.scrollBehavior = "";
    }
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="app" replace />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/app/*" element={<ProtectedRoute />}>
        <Route path="*" element={<AppRoutes />} />
      </Route>
      <Route path="*" element={<>No encontrado</>} />
    </Routes>
  );
}

export default App;
