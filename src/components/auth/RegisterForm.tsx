import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useRegister } from "@hooks/.";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { register: signup, isPending } = useRegister();

  const onSubmit = (data: Inputs) => {
    signup({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      device_name: window.navigator.userAgent,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label
          htmlFor="first_name"
          className="text-sm font-medium text-gray-700"
        >
          Nombre(s){" "}
          <FontAwesomeIcon
            icon={faAsterisk}
            className="text-red-500"
            size="xs"
          />
        </label>
        <input
          autoFocus
          {...register("first_name", {
            required: "El nombre es requerido",
          })}
          placeholder="Ej. Juan"
          id="first_name"
          type="text"
          className={clsx(
            "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
            { "border-red-500": errors.first_name }
          )}
        />
        {errors.first_name && (
          <p className="text-sm text-red-500">{errors.first_name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="last_name"
          className="text-sm font-medium text-gray-700"
        >
          Apellidos{" "}
          <FontAwesomeIcon
            icon={faAsterisk}
            className="text-red-500"
            size="xs"
          />
        </label>
        <input
          {...register("last_name", {
            required: "Los apellidos son requeridos",
          })}
          placeholder="Ej. Pérez Sánchez"
          id="last_name"
          type="text"
          className={clsx(
            "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
            { "border-red-500": errors.last_name }
          )}
        />
        {errors.last_name && (
          <p className="text-sm text-red-500">{errors.last_name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Correo electrónico{" "}
          <FontAwesomeIcon
            icon={faAsterisk}
            className="text-red-500"
            size="xs"
          />
        </label>
        <input
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
          Contraseña{" "}
          <FontAwesomeIcon
            icon={faAsterisk}
            className="text-red-500"
            size="xs"
          />
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
        {isPending ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};
