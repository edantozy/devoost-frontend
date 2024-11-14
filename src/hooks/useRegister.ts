import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAppDispatch } from "@redux/store";
import { login as loginThunk } from "@redux/thunks/authThunks";

export interface IRegisterResponse {
  token: string;
}

const register = async (params: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  device_name: string;
}) => {
  const response = await axios.post<IRegisterResponse>(
    `${import.meta.env.VITE_API_URL}/api/register`,
    params,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

export function useRegister(
  handleSuccess?: () => void,
  handleError?: () => void
) {
  const dispatch = useAppDispatch();

  const { mutateAsync, isPending, isError, data, isSuccess } = useMutation({
    mutationFn: register,
    onSuccess: async (data) => {
      if (handleSuccess) handleSuccess();
      toast.success("Registro exitoso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(loginThunk({ token: data.token }));
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        const status = error.response.status;

        switch (status) {
          case 422:
            toast.error("Error de validación", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            break;
          default:
            toast.error("Error inesperado", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            break;
        }
      }
      if (handleError) handleError();
    },
  });

  return {
    register: mutateAsync,
    isPending,
    isError,
    isSuccess,
    data,
  };
}
