
import { addOrder, getOrders } from "@/api/api";
import { Order } from "@/models/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetOrders = () => {
    return useQuery<Order[], Error>({
        queryKey: ["orderList"],
        queryFn: getOrders,
    });
};

// export const useRemoveShoppingCartPosition = () => {
//     const queryClient = useQueryClient();
//     return useMutation(
//         {
//             mutationFn: removeShoppingCartPosition,
//             mutationKey: ["shoppingCart"],
//             onSuccess: () => {
//                 queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
//             },
//         });
// };

export const useAddOrders = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orderList"] });
            queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
        },
    });
    return mutation;
};

// export const useUpdateShoppingCartPosition = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: updateShoppingCartPosition,
//         mutationKey: ["shoppingCart"],
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
//         },
//     });
// };