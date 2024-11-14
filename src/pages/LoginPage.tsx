import { LoginForm } from "@components/auth";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 via-sky-500 to-cyan-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Iniciar sesión
            </h2>
            <p className="text-center text-sm text-gray-600">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>
          <LoginForm />
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 space-y-2">
          <Link to="/auth/reset-password" className="text-sm text-indigo-600 hover:text-indigo-500">
            ¿Olvidaste tu contraseña?
          </Link>
          <div className="text-sm text-center text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-500">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
