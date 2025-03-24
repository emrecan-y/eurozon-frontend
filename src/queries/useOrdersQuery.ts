import { addOrder, getOrders } from "@/api/api";
import { Order } from "@/models/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ["orderList"],
    queryFn: getOrders,
  });
};

export const useAddOrders = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orderList"] });
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
      toast.success(data);
    },
    onError: (error) => {
      const errorMessage =
        typeof error === "string" ? error : "An unexpected error occurred.";
      toast.error(errorMessage);
    },
  });
  return mutation;
};
