import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUser, editUser } from "./api";

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: unknown }) =>
      editUser(id, data),
    onMutate: () => {
      console.log("do something, like optimistic update");
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
        refetchType: "all",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
