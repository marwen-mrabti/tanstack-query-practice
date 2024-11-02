import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_MOCK_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
});

export const useGetUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosClient.get("/users");
      return response.data;
    },
    refetchOnWindowFocus: true,
  });

  return { data, isLoading, error };
};
