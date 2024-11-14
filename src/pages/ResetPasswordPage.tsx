import { useSendPasswordRecoveryEmail } from "@hooks/useSendPasswordResetLink";
import clsx from "clsx";
import { useForm } from "react-hook-form";

export const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const { sendPasswordRecoveryEmail, isPending, isSuccess } =
    useSendPasswordRecoveryEmail();

  const onSubmit = (data: { email: string }) => {
    sendPasswordRecoveryEmail({ email: data.email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 via-sky-500 to-cyan-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden my-5">
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Restablecer contraseña
            </h2>
            <p className="text-center text-sm text-gray-600">
              Te ayudaremos a restablecer tu contraseña
            </p>
          </div>
          {isSuccess ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <strong className="font-bold">¡Correo enviado!</strong>{" "}
              <span className="block sm:inline">
                Hemos enviado un correo electrónico con instrucciones para
                restablecer tu contraseña
              </span>
            </div>
          ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 mb-5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "El correo electrónico es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo electrónico inválido",
                  },
                })}
                placeholder="Ingresa tu correo electrónico"
                className={clsx(
                  "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
                  { "border-red-500": errors.email }
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isPending
                ? "Enviando correo..."
                : "Enviar correo de recuperación"}
            </button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
};
