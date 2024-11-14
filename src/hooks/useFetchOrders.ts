import { useAppSelector } from "@redux/store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

interface IOrdersResponse {
  data: IOrder[];
  meta: IMeta;
}

interface IOrder {
  id: number;
  order_number: string;
  client: IClient;
  products: IOrderItem[];
  status: IStatus;
  created_at: Date;
  updated_at: Date;
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
  subtotal: string;
  created_at: Date;
  updated_at: Date;
  product: IProduct;
}

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  created_at: Date;
  updated_at: Date;
}

export enum IStatus {
  Cancelled = "cancelled",
  Completed = "completed",
  Pending = "pending",
}

interface IMeta {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

interface IParams {
  per_page: number;
  page: number;
}

const fetchOrders = async (params: IParams, token: string) => {
  const response = await axios.get<IOrdersResponse>(
    `${import.meta.env.VITE_API_URL}/api/orders`,
    {
      params,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export function useFetchOrders(
  initialParams = {} as IParams,
  queryKey = "fetchOrders"
) {
  const { token } = useAppSelector((state) => state.auth);
  const [params, setParams] = useState<IParams>(initialParams);

  const queryResults = useQuery({
    queryKey: [queryKey, params, token],
    queryFn: () => fetchOrders(params, token!),
    enabled: !!token,
    select: (data) => data,
    retry: 1,
  });

  return { ...queryResults, setParams, params };
}
