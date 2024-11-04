import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import { getInfiniteProducts, getProducts, getUsers } from "./api";

export const useGetUsers = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchOnWindowFocus: true,
  });

  return { users, isLoading, error };
};

// with pagination
export const useGetProducts = ({ page }: { page: number }) => {
  const {
    data: products,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: () => getProducts(page),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    // initialData,
  });
  return { products, isLoading, error, isError };
};

// infinite queries
export const useGetInfiniteProducts = () => {
  return useInfiniteQuery({
    queryKey: ["infinite-products"],
    queryFn: getInfiniteProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
};
