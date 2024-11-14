import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export interface ISendPasswordRecoveryEmailResponse {
  message: string;
}

const sendPasswordRecoveryEmail = async (params: { email: string }) => {
  const response = await axios.post<ISendPasswordRecoveryEmailResponse>(
    `${import.meta.env.VITE_API_URL}/api/sendPasswordResetLink`,
    params,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

export function useSendPasswordRecoveryEmail(
  handleSuccess?: () => void,
  handleError?: () => void
) {
  const { mutateAsync, isPending, isError, data, isSuccess } = useMutation({
    mutationFn: sendPasswordRecoveryEmail,
    onSuccess: async () => {
      if (handleSuccess) handleSuccess();
      toast.success("Correo de recuperación enviado");
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        const status = error.response.status;

        switch (status) {
          case 422:
            toast.error("Correo electrónico inválido");
            break;
          default:
            toast.error("Ha ocurrido un error");
            break;
        }
      }
      if (handleError) handleError();
    },
  });

  return {
    sendPasswordRecoveryEmail: mutateAsync,
    isPending,
    isError,
    isSuccess,
    data,
  };
}
