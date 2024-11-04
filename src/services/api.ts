import axios from "axios";

import { TProduct } from "../components/products";
import { TUser } from "../components/users";

const API_URL = import.meta.env.VITE_MOCK_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
});
export const getUsers = async (): Promise<TUser[] | undefined> => {
  const response = await axiosClient.get("/users");
  return response.data as TUser[];
};

export const editUser = async (id: number, data: unknown): Promise<boolean> => {
  const response = await axiosClient.put(`/users/${id}`, data);
  return response.status === 200;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`/users/${id}`);
  return response.status === 200;
};

// pagination
export const getProducts = async (page = 1): Promise<TProduct[]> => {
  const response = await axiosClient.get(`/products?page=${page}&limit=10`);
  return response.data as TProduct[];
};

// infinite queries
export const getInfiniteProducts = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<TProduct[]> => {
  const response = await axiosClient.get(
    `/products?page=${pageParam + 1}&limit=5`
  );
  return response.data as TProduct[];
};
