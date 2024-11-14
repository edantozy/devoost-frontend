import { RegisterForm } from "@components/auth";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 via-sky-500 to-cyan-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden my-5">
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Regístrate
            </h2>
            <p className="text-center text-sm text-gray-600">
              Ingresa tus datos para registrarte
            </p>
          </div>
          <RegisterForm />
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 space-y-2">
          <p className="text-sm text-gray-600 text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
