import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useLogin } from "@hooks/.";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { login, isPending } = useLogin();

  const onSubmit = (data: Inputs) => {
    login({
      email: data.email,
      password: data.password,
      device_name: window.navigator.userAgent,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <input
          autoFocus
          {...register("email", {
            required: "El correo electrónico es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Correo electrónico inválido",
            },
          })}
          id="email"
          type="email"
          placeholder="tu@ejemplo.com"
          className={clsx(
            "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
            { "border-red-500": errors.email }
          )}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          {...register("password", { required: "La contraseña es requerida" })}
          id="password"
          type="password"
          className={clsx(
            "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
            { "border-red-500": errors.password }
          )}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
    </form>
  );
};
