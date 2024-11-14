import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IStatus } from "./useFetchOrders";

interface Items {
  product_id: number;
  quantity: number;
}

const updateOrder = async (params: {
  order_id: string;
  client_id: string;
  status: IStatus;
  items: Items[];
  token: string;
}) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/orders/${params.order_id}`,
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

export function useUpdateOrder(
  handleSuccess?: () => void,
  handleError?: () => void
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError, data, isSuccess } = useMutation({
    mutationFn: updateOrder,
    onSuccess: async () => {
      toast.success(`Orden actualizada correctamente`);
      await queryClient.invalidateQueries({
        queryKey: ["fetchOrders"],
      });
      if (handleSuccess) handleSuccess();
    },
    onError: (error: AxiosError) => {
      toast.error("Ocurrió un error al actualizar la orden");
      if (handleError) handleError();
      console.error(error);
    },
  });

  return {
    updateOrder: mutateAsync,
    isPending,
    isError,
    isSuccess,
    data,
  };
}
