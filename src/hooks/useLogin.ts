import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAppDispatch } from "@redux/store";
import { login as loginThunk } from "@redux/thunks/authThunks";

export interface ILoginResponse {
  token: string;
}

const login = async (params: {
  email: string;
  password: string;
  device_name: string;
}) => {
  const response = await axios.post<ILoginResponse>(
    `${import.meta.env.VITE_API_URL}/api/login`,
    params,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

export function useLogin(handleSuccess?: () => void, handleError?: () => void) {
  const dispatch = useAppDispatch();

  const { mutateAsync, isPending, isError, data, isSuccess } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (handleSuccess) handleSuccess();
      toast.success("Inicio de sesión exitoso", {
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
            toast.error("Usuario y/o contraseña incorrectos", {
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
    login: mutateAsync,
    isPending,
    isError,
    isSuccess,
    data,
  };
}
