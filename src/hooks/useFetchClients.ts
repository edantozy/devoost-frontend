import { useAppSelector } from "@redux/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface IClientsResponse {
  data: IClient[];
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

const fetchClients = async (token: string) => {
  const response = await axios.get<IClientsResponse>(
    `${import.meta.env.VITE_API_URL}/api/clients`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export function useFetchClients(queryKey = "fetchOrders") {
  const { token } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: [queryKey, token],
    queryFn: () => fetchClients(token!),
    enabled: !!token,
    select: (data) => data.data,
    retry: 1,
  });
}
