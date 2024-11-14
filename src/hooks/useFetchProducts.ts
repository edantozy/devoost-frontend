import { useAppSelector } from "@redux/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface IProductsResponse {
  data: IProduct[];
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

const fetchProducts = async (token: string) => {
  const response = await axios.get<IProductsResponse>(
    `${import.meta.env.VITE_API_URL}/api/products`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export function useFetchProducts(queryKey = "fetchProducts") {
  const { token } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: [queryKey, token],
    queryFn: () => fetchProducts(token!),
    enabled: !!token,
    select: (data) => data.data,
    retry: 1,
  });
}
