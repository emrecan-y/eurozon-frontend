import {
  addShoppingCartPosition,
  getShoppingCartPositions,
  removeShoppingCartPosition,
  updateShoppingCartPosition,
} from "@/api/api";
import { ShoppingCartPosition } from "@/models/shoppingcartPosition";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetShoppingCartPositions = () => {
  return useQuery<ShoppingCartPosition[], Error>({
    queryKey: ["shoppingCart"],
    queryFn: getShoppingCartPositions,
  });
};

export const useRemoveShoppingCartPosition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeShoppingCartPosition,
    mutationKey: ["shoppingCart"],
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
    },
    onError: (error) => {
      const errorMessage =
        typeof error === "string" ? error : "An unexpected error occurred.";
      toast.error(errorMessage);
    },
  });
};

export const useAddShoppingCartPosition = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addShoppingCartPosition,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
    },
    onError: (error) => {
      const errorMessage =
        typeof error === "string" ? error : "An unexpected error occurred.";
      toast.error(errorMessage);
    },
  });
  return mutation;
};

export const useUpdateShoppingCartPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateShoppingCartPosition,
    mutationKey: ["shoppingCart"],
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
    },
    onError: (error) => {
      const errorMessage =
        typeof error === "string" ? error : "An unexpected error occurred.";
      toast.error(errorMessage);
    },
  });
};
