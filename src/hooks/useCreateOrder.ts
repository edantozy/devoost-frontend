import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IStatus } from "./useFetchOrders";

interface Items {
  product_id: number;
  quantity: number;
}

const createOrder = async (params: {
  client_id: string;
  status: IStatus;
  items: Items[];
  token: string;
}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/orders`,
    {
      client_id: params.client_id,
      status: params.status,
      items: params.items,
    },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${params.token}`,
      },
    }
  );
  return response.data;
};

export function useCreateOrder(
  handleSuccess?: () => void,
  handleError?: () => void
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError, data, isSuccess } = useMutation({
    mutationFn: createOrder,
    onSuccess: async () => {
      toast.success("Orden creada correctamente");
      await queryClient.invalidateQueries({
        queryKey: ["fetchOrders"],
      });
      if (handleSuccess) handleSuccess();
    },
    onError: (error: AxiosError) => {
      toast.error("Ocurrió un error al crear la orden");
      if (handleError) handleError();
      console.error(error);
    },
  });

  return {
    createOrder: mutateAsync,
    isPending,
    isError,
    isSuccess,
    data,
  };
}
