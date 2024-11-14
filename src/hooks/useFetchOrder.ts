import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@redux/store";

interface IOrderResponse {
  data: IOrder;
}

export interface IOrder {
  id: number;
  order_number: string;
  client: IClient;
  products: IOrderItem[];
  status: IStatus;
  total: number;
  created_at: Date;
  updated_at: Date;
}

enum IStatus {
  Pending = "pending",
  Completed = "completed",
  Cancelled = "cancelled",
}

interface IClient {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  created_at: Date;
  updated_at: Date;
}

interface IOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  subtotal: number;
  created_at: Date;
  updated_at: Date;
  product: IProduct;
}

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

const fetchOrder = async (id: string, token: string) => {
  const response = await axios.get<IOrderResponse>(
    `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const useFetchOrder = (id: string, queryKey = "fetchOrder", options = {}) => {
  const { token } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: [queryKey],
    ...options,
    queryFn: () => fetchOrder(id, token!),
    enabled: !!token,
    retry: 1,
    select: (data) => data.data,
  });
};
