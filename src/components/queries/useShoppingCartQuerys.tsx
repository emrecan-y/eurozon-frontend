import { addShoppingCartPosition, getShoppingCartPositions, removeShoppingCartPosition, updateShoppingCartPosition } from "@/api/api";
import { ShoppingCartPosition } from "@/models/shoppingcartPosition";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetShoppingCartPositions = () => {
    return useQuery<ShoppingCartPosition[], Error>({
        queryKey: ["shoppingCart"],
        queryFn: getShoppingCartPositions,
    });
};

export const useRemoveShoppingCartPosition = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn: removeShoppingCartPosition,
            mutationKey: ["shoppingCart"],
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
            },
        });
};

export const useAddShoppingCartPosition = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addShoppingCartPosition,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
        },
    });
    return mutation;
};

export const useUpdateShoppingCartPosition = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateShoppingCartPosition,
        mutationKey: ["shoppingCart"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
        },
    });
};